import Container from "../components/Container";

const Contact = () => {
  return (
    <section className="bg-[#2E2F39] pt-10 pb-5 w-full" id="contact">
      <Container>
        <form
          action=""
          className="flex flex-col gap-5 m-auto mb-[100px] max-w-[500px]"
        >
          <input
            type="text"
            placeholder="Your email"
            className="px-4 py-2 border rounded-xl max-w-[500px]"
          />
          <input
            type="text"
            placeholder="Enter message"
            className="px-4 py-2 border rounded-xl max-w-[500px]"
          />
          <button className="block bg-white hover:bg-transparent px-4 py-2 border border-amber-50 hover:border-[#F9E84E] rounded-xl text-[#171717] hover:text-white transition duration-300">
            contact me
          </button>
        </form>
        <p className="text-center">
          @DESIGNED AND DEVELOPED BY
          <span className="text-[#F9E84E]"> YEVHENII SLOBODIANIUK</span>
        </p>
      </Container>
    </section>
  );
};

export default Contact;
