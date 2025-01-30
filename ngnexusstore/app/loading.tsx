import Image from "next/image";
import loader from "@/assets/loader.gif";
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Image src={loader} width={150} height={150} alt="Loading ..." />
    </div>
  );
}
