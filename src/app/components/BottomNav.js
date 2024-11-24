import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const BottomNav = (props) => {
  const githubIcon = <FontAwesomeIcon icon={faGithub} />;
  const planeIcon = <FontAwesomeIcon icon={faPaperPlane} />;

  return (
    <>
      <div className="row brandRow text-end fixed-bottom">
        <p className="linkLogos">
          <a id="gitLogo" href="https://github.com/robotlions">
            {githubIcon}
          </a>
          {"\n"}
          <a id="mailLogo" href="mailto:info@robotlions.com" >
            {planeIcon}
          </a>
          {"\n"}
        </p>
      </div>
    </>
  );
};
