export default function Comments({ name, comment }) {
  return (
    <div className="w-full flex flex-col items-start gap-4 p-2 bg-primary rounded-xl text-white">
      <p className="text-lg font-bold ">{name}</p>
      <p className="text-base">{comment}</p>
    </div>
  );
}
