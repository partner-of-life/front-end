"use server";

export default async function About() {
  return (
    <>
      <p className="p-36 text-2xl text-center">
        <div className="text-4xl font-bold mb-10">
            ABOUT
        </div>
        <span className="underline decoration-pink-500/100">"Partner of Life"</span>{" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum vero
        cupiditate iure, sint rem eligendi dolore inventore fuga illo asperiores
        commodi neque harum assumenda nostrum aut sapiente. Aliquid, alias
        consequatur!
      </p>
    </>
  );
}