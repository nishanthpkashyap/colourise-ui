import React, { useEffect, useState } from "react";
import { Button, Upload, Spin, message } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import fileDownload from "js-file-download";

export function Colourise() {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalFile, setOriginalFile] = useState(null);
  const [file, setFile] = useState(null);

  function FilePreview() {
    const [fileUrl, setFileUrl] = useState("");
    const [orginalFileUrl, setOrginalFileUrl] = useState("");

    useEffect(() => {
      if (file) previewFile();
      if (originalFile) {
        previewOrignalFile();
      }
    }, [file, originalFile]);

    useEffect(() => {
      console.log(
        "File Url:\n",
        fileUrl,
        "\nOriginal File Url:\n",
        orginalFileUrl
      );
    }, [fileUrl, orginalFileUrl]);

    const previewFile = () => {
      const reader = new FileReader();
      reader.onload = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(file);
    };

    const previewOrignalFile = () => {
      const reader = new FileReader();
      reader.onload = () => {
        setOrginalFileUrl(reader.result);
      };
      reader.readAsDataURL(originalFile);
    };

    return (
      <>
        {fileUrl &&
          (fileType.startsWith("image") ? (
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ marginRight: "2rem"}}>
                <img src={orginalFileUrl} alt={fileName} />
                <h3>Greyscale</h3>
              </div>
              <div>
                <img src={fileUrl} alt={fileName} />
                <h3>Colour</h3>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "2rem" }}>
                <video controls width="360" height="360">
                  <source src={orginalFileUrl} type={fileType} />
                </video>
                <h3>Greyscale</h3>
              </div>
              <div>
                <video controls width="360" height="360">
                  <source src={fileUrl} type={fileType} />
                </video>
                <h3>Colour</h3>
              </div>
            </div>
          ))}
      </>
    );
  }

  useEffect(() => {
    console.log(
      `States changed:\nFilename: ${fileName}\nFiletype: ${fileType}\nFilepath: ${filePath}\nDownloaded?: ${downloaded}\nLoading?: ${loading}`
    );
    // console.log("File:\n", file)
  }, [fileName, fileType, filePath, downloaded, loading, file]);

  useEffect(() => {
    console.log("original file:\n", originalFile);
  }, [originalFile]);

  useEffect(() => {
    const getFile = async () => {
      const { status, data } = await axios.get("http://localhost:5500/file", {
        params: { filePath },
        responseType: "blob",
      });

      if (status === 200) {
        // console.log("got response from file");
        setFile(data);
      } else {
        message.error(`Download request with error code ${status}`);
      }
    };
    if (filePath !== "") {
      getFile();
    }
  }, [filePath]);

  const downloadFile = async () => {
    try {
      setLoading((prevState) => !prevState);
      fileDownload(file, fileName);
      // console.log("Changing states Inside Download File");
      setFilePath("");
      setFileName("");
      setFileType("");
      setDownloaded((prevState) => !prevState);
      setFile(null);
    } catch (err) {
      message.error("Oops!! Something went wrong, try again later.");
      console.log("error:\n", err);
      setDownloaded((prevState) => !prevState);
      setFilePath("");
      setFileName("");
      setFileType("");
      setLoading((prevState) => !prevState);
      setDownloaded((prevState) => !prevState);
      setFile(null);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (isImage || isVideo) {
      setLoading((prevState) => !prevState);
      return true;
    }

    message.error("You can only Colourise images and videos");
    return false;
  };

  const clear = () => {
    setDownloaded((prevState) => !prevState);
    setFilePath("");
    setFileName("");
    setFileType("");
    setLoading((prevState) => !prevState);

    setDownloaded((prevState) => !prevState);
    setFile(null);
  };

  const onchange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} File Colourised Successfully`);

      console.log("Got File:\n", info.file.originFileObj);

      setOriginalFile(info.file.originFileObj);
      setFileType(info.file.type);
      setFileName(info.file.name);
      setFilePath(info.file.response);
      setDownloaded((prevState) => !prevState);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div
      className="content colourise"
      id={"colourise"}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <h1>Colourise images and videos</h1>
      {file == null ? (
        <React.Fragment>
          <Spin spinning={loading} size="large">
            <Upload.Dragger
              accept="image/*, video/*"
              listType="picture-card"
              action={"http://localhost:5500/colourise"}
              beforeUpload={beforeUpload}
              progress={{
                strokeWidth: 3,
                strokeColor: {
                  "0%": "#f0f",
                  "100%": "#ff0",
                },
              }}
              onChange={onchange}
              style={{
                marginTop: "2rem",
                marginBottom: "1rem",
                width: "40rem",
              }}
            >
              Drag files here OR
              <br />
              <br />
              <Button icon={<UploadOutlined />}>Click Upload</Button>
              <br />
              <br />
              to Colourise your files
            </Upload.Dragger>
          </Spin>
        </React.Fragment>
      ) : (
        <>
          {file != null && <FilePreview />}
          <Button
            icon={<DownloadOutlined />}
            onClick={downloadFile}
            size="large"
            style={{
              marginTop: "1rem",
              // backgroundColor: "#1890ff",
              // fontWeight: "bolder",
              // color: "#fff",
            }}
          >
            Colourised {fileName}
          </Button>
          <Button
            size="large"
            onClick={clear}
            style={{
              marginTop: "1rem",
            }}
          >
            Clear {fileName}
          </Button>
        </>
      )}
    </div>
  );
}
