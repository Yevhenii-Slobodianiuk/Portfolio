"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

export default function AsciiHead() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let effect: AsciiEffect;
    let model: THREE.Object3D | null = null;

    const start = Date.now();

    init();
    animate();

    function init() {
      const container = containerRef.current!;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 2000);
      camera.position.set(0, 0, 3);

      scene = new THREE.Scene();

      const light1 = new THREE.PointLight(0xffffff, 2);
      light1.position.set(1, 1, 1);
      scene.add(light1);

      const light2 = new THREE.AmbientLight(0x404040, 2);
      scene.add(light2);

      const loader = new GLTFLoader();
      loader.load(
        "/3d/head.glb",
        (gltf) => {
          model = gltf.scene;
          model.scale.set(1, 1, 1);
          scene.add(model);
        },
        (xhr) => {
          console.log(`Завантаження: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
          console.error("Помилка завантаження моделі:", error);
        }
      );

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);

      effect = new AsciiEffect(renderer, " .▀-+*=%@#", { invert: true });
      effect.setSize(width, height);
      effect.domElement.style.color = "white";
      effect.domElement.style.backgroundColor = "transparent";
      container.appendChild(effect.domElement);

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function animate() {
      requestAnimationFrame(animate);
      const t = (Date.now() - start) * 0.001;

      if (model) {
        model.rotation.y = t * 1;
      }

      effect.render(scene, camera);
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      containerRef.current?.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="w-[300px] h-[300px]" />;
}
