import Image from "next/image";
import {Button, Heading, MenuBar} from "tp-kit/components";

export default function Menu() {
    return (
        <MenuBar leading={"Starbuucks"}
                 trailing={<Button>Panier</Button>}
        />
    )
}

/**
 *          <Heading
 *                 as="h1"
 *                 size="lg"
 *                 weight="bold"
 *                 className={"bg-vertsb text-white flex flex-col items-center justify-between text-6xl p-12"}
 *             >
 *                 <Image src="/starbucks-logo-opacity-coffee-light.svg"
 *                        width={100} height={100}
 *                        alt={'logo starbucks'}
 *                 />
 *                 <div className={"p-2"}>Starbuucks</div>
*           </Heading>
 */