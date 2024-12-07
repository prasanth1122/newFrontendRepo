import demoImg from "../../assets/demoIMG.png";
export default function CollectionCard() {
  return (
    <div
      className="min-w-coverImage flex items-start flex-col gap-2 bg-white p-6 rounded-lg shadow-lg  hover:cursor-pointer 
        transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-card_shadow"
    >
      <img className="min-w-coverImage h-coverImage " src={demoImg} />
      <p className="text-2xl font-bold mt-2 ">Collection Name</p>
      <p className="text-lg text-black-500 ">Date:</p>
    </div>
  );
}
