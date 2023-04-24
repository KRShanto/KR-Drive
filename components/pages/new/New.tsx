import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

// icons
import { FiFileText, FiFolder, FiFilePlus, FiUpload } from "react-icons/fi";

export default function New() {
  const router = useRouter();
  // under is the path of the folder where the new file/folder will be created
  const { under } = router.query;

  return (
    <div id="New">
      <h1 className="heading">
        Create New inside <span className="path">{under ? under : "/"}</span>
      </h1>

      <div className="links">
        <Link href={`/new/create-text?under=${under || ""}`} className="link">
          <FiFileText />
          Create Text File
        </Link>

        <Link href={`/new/create-folder?under=${under || ""}`} className="link">
          <FiFolder />
          Create Folder
        </Link>

        {/* <Link href={`/new/create-note?under=${under || ""}`} className="link">
          <FiFilePlus />
          Create Note
        </Link> */}

        <Link href={`/new/upload-file?under=${under || ""}`} className="link">
          <FiUpload />
          Upload File/Folder
        </Link>
      </div>
    </div>
  );
}
