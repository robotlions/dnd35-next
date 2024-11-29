import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";





export const BottomNav = () =>{

const githubIcon = <FontAwesomeIcon icon={faGithub} />;
const planeIcon = <FontAwesomeIcon icon={faPaperPlane} />;

    return(

        <div className="fixed bottom-5 right-10 z-50">
        <div className="flex justify-end gap-3">
          <Link href="https://github.com/robotlions">
            <div className="w-12 text-gray-200 hover:text-sky-600">{githubIcon}</div>
          </Link>
          {"\n"}
          <Link href="mailto:info@robotlions.com">
            <div className="w-12 text-gray-200 hover:text-sky-600">{planeIcon}</div>
          </Link>
        </div>
      </div>

    )
}