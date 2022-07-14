import Image from "next/image";

export default function Button(props) {
  return (
    <button className=" rounded-full text-xl text-[#23024d]">{props.name}       
    <Image src="/launch-app-button.png" alt="Launch App Button" width={250} height={220} />
    </button>
  );

  //
}
