import Image from "next/image";

import { Navbar } from "@/components/layout/Navbar";

import Pic from "../../public/images/hero.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar
        items={[
          { label: "3D Models", href: "/Models" },
          { label: "About", href: "/about" },
        ]}
      />
      <div className="container mx-auto bg-gray-200 flex flex-1 items-center justify-around p-4">
        <div className="text-center flex flex-col items-start justify">
          <p className="text-xs text-black">
            YOUR GO-TO PLATFORM FOR 3D PRINTING FILES
          </p>
          <h1 className="mb-4 text-black text-4xl font-bold">
            Discover what&apos;s possible with 3d printing
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Join our community of creators and explore a vast library of
            user-submitted models.{" "}
          </p>

          <button className="border border-s-2 p-2 cursor-pointer text-black">
            {" "}
            Browse Models
          </button>
        </div>

        <div>
          <Image src={Pic} alt="Next.js Logo" width={600} height={600} />
        </div>
      </div>
    </main>
  );
}
