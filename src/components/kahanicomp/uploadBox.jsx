import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadBox = () => {
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitBtn, setSubmitBtnLabel] = useState("Submit");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.802.0.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const resetData = () => {
    setName("");
    setError("");
    setPhone("");
    setFileName("");
    setSubmitBtnLabel("Submit");
  };

  const removeFile = () => {
    setFileName("");
    document.getElementById("upload-btn").value = "";
  };

  const onTelChange = (e) => {
    const re = /^[0-9-+.() ]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const validPhone = (inputtxt) => {
    var phoneno = inputtxt.replace(/[^\w\s]/gi, "");
    if (phoneno.length >= 7) {
      return true;
    } else {
      return false;
    }
  };

  const _handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (
        file.size / 1024 / 1024 > 800||
        !file.type.match("video") ||
        file.name.substr(file.name.lastIndexOf(".") + 1).toLowerCase() != "mp4"
      ) {
        const error =
          file.size / 1024 / 1024 > 800
            ? `Please upload a video less than 800MB in file size.`
            : `Please upload your video in MP4 file format.`;

        setError(error);

        removeFile();
      } else {
        setFileName(file.name);
        setError("");
      }
    }
  };

  const uploadVideoFile = (filePath, file, isSuccess) => {
    axios
      .post("https://jxkzj2iz23.execute-api.ap-south-1.amazonaws.com/storyup", {
        object_key: `${filePath}`,
      })
      .then(function (response) {
        const signedVideoUrl = response.data.url;
        var options = { headers: { "Content-Type": file.type } };
        var config = {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );;
            isSuccess(percentCompleted);
          },
        };
        return axios
          .put(signedVideoUrl, file, config, options)
          .then((resp) => {
            alert(" Thank you. We will contact you shortly.");
          })
          .catch((e) => {
            alert(" Thank you. We will contact you shortly.");
            isSuccess(-1);
          });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitBtnLabel(`Uploading...`);
    window.AWS.config.region = "ap-south-1";
    window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-south-1:63117ff3-7736-42cb-9844-d10ad4606e59",
    });
    window.AWS.config.credentials.get(function (err) {
      if (err) alert(err);
    });
    const s3Bucket = new window.AWS.S3({
      params: { Bucket: "yourstories.workmob.com" },
    });
    const timeStamp = new Date().getTime();
    let filePath = "";
    if (!!fileName) {
      filePath = timeStamp + "-" + phone + "." + fileName.split(".").pop();
    }
    const file = document.getElementById("upload-btn").files[0];
    uploadUserData(s3Bucket, timeStamp, name, phone, filePath);
    if (!!fileName) {
      uploadVideoFile(filePath, file, (isSuccess) => {
        var uploaded = isSuccess;
        setSubmitBtnLabel(`${uploaded}% Uploading....`);
        if (uploaded == 100) {
          removeFile();
          sentEmailToWM("Yes");
          resetData();
        }
        if (isSuccess == -1) {
          removeFile();
          resetData();
          sentEmailToWM("No");
          uploadUserData(
            s3Bucket,
            timeStamp,
            name,
            phone,
            filePath,
            "Tried to upload"
          );
        }
      });
    }
  };

  const sentEmail = (name, phone, source, videoUploaded) => {
    axios({
      method: "post",
      url: "https://17d67id312.execute-api.ap-south-1.amazonaws.com/prod",
      headers: {
        "content-type": "application/json",
      },
      data: {
        //to: 'manish@arcgate.com', // This is the body part
        subject: "Hope Video Email Notification",
        body: `<html><body>Checkout my video: <h3 style="margin:0">Name: ${name}</h2> <h3 style="margin:0">Phone: ${phone}</h3> <h3 style="margin:0">Source: ${source}</h3> <h3 style="margin:0">Video Uploaded: ${videoUploaded}</h3><addr><br /><br /><small>Thanks <br />Team Arcgate</small></addr></body></html>`,
      },
    }).then((response) => {
      console.log("Email sent");
      // gtag_report_conversion('https://stories.workmob.com/merikahani');
    });
  };

  const getQueryStringValue = (url, key) => {
    return decodeURIComponent(
      url.replace(
        new RegExp(
          "^(?:.*[&\\?]" +
            encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
            "(?:\\=([^&]*))?)?.*$",
          "i"
        ),
        "$1"
      )
    );
  };

  const sentEmailToWM = (videoUploaded = "No") => {
    const source = getQueryStringValue(window.location.href, "source") || "NA";
    if (
      window.location.hostname != "3.6.75.225" &&
      window.location.hostname != "localhost"
    ) {
      sentEmail(name, phone, source, videoUploaded);
    }
  };

  const uploadUserData = (
    s3Bucket,
    timeStamp,
    name,
    phone,
    videoName,
    triedToupload = false
  ) => {
    fetch(
      `https://s3.ap-south-1.amazonaws.com/yourstories.workmob.com/userdata.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const source =
          getQueryStringValue(window.location.href, "source") || "NA";
        const finalArr = data;
        const _data = { name, phone, videoName, timeStamp, source };
        if (!!triedToupload) {
          const _index = finalArr.findIndex(
            (e) => JSON.stringify(e) === JSON.stringify(_data)
          );
          if (_index > -1) {
            finalArr.splice(_index, 1);
            const _dataNew = {
              name,
              phone,
              videoName: "Tried to upload",
              timeStamp,
              source,
            };
            finalArr.push(_dataNew);
          }
        } else {
          finalArr.push(_data);
        }
        const filePathFile = "userdata.json";
        const myFile = new Blob([JSON.stringify(finalArr)], {
          type: "application/json",
        });
        s3Bucket
          .upload(
            {
              Key: filePathFile,
              Body: myFile,
              ACL: "public-read",
            },
            function (err, data) {
              if (!fileName) {
                resetData();
              }
              if (err) {
                return;
              }
            }
          )
          .on("httpUploadProgress", function (progress) {
            if (!fileName) {
              resetData();
              sentEmailToWM("No");
              alert(" Thank you. We will contact you shortly.");
            }
          });
      });
  };

  return (
    <div>
      <div className="bg-white p-3 pt-4 my-2 upload-video-box mx-auto w-100">
        <h3 className="text-center title">Tell your story, inspire and win</h3>
        <p className="text-center sub-title">
          Upload you video or submit your contact details and we will set up a
          time to record your story.
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group pt-0 mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              className="form-control border-0 border-bottom-1 pl-0"
              maxLength="100"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              value={phone}
              onChange={(e) => onTelChange(e)}
              id="phone"
              className="form-control border-0 border-bottom-1 pl-0"
              name="telphone"
              placeholder="Mobile"
              required
            />
          </div>
          <div className="form-group upload pt-md-4 pt-md-3">
            <div className="position-relative d-flex align-items-center">
              <input
                accept="video/mp4"
                onChange={_handleChange}
                type="file"
                className="form-control-file"
                id="upload-btn"
              />
              <label
                className="file-label rounded-circle  mb-0"
                htmlFor="upload-btn"
              >
                <i style={{ fontSize: "1.2rem" }} className="bi bi-plus"></i>
              </label>
              <span className="file-chosen font-alata">Upload your video</span>
            </div>
            {!!fileName && (
              <div className="position-relative d-flex align-items-center">
                <label
                  style={{ opacity: 0 }}
                  className="bg-transparent file-label rounded-circle icon icon-plus mb-0"
                ></label>
                <p className="file-chosen font-alata file-name position-relative pr-4 mb-0">
                  {fileName}
                  <span
                    onClick={removeFile}
                    style={{ top: -5, right: -7, cursor: "pointer" }}
                    className="position-absolute bg-transparent border-0 px-3 font-bold text-danger"
                  >
                    x
                  </span>
                </p>
              </div>
            )}
            {!!error && (
              <div className="position-relative d-flex align-items-center">
                <label className="bg-transparent file-label rounded-circle icon icon-plus mb-0"></label>
                <p className="file-chosen font-alata file-name position-relative pr-4 mb-0 d-flex text-danger">
                  <span className="font-bold text-danger pl-1">*</span>
                  {error}
                </p>
              </div>
            )}
            <div className="pb-md-0 d-md-block d-none">&nbsp;</div>
          </div>
          <div className="text-center">
            <button
              disabled={!validPhone(phone) || !name || submitBtn != "Submit"}
              type="submit"
              className={submitBtn.includes('Uploading....') ? "btn btn-primary mx-auto border-0 buttonSubmitKahaniUpload" : "btn btn-primary mx-auto border-0 buttonSubmitKahani"}
            >
              {submitBtn}
            </button>
          </div>
        </form>
      </div>
      {/* <p className="text-white text-center mt-2">
        {" "}
        <a className="text-white" target="_blank" href="https://stories.workmob.com/create">
          See
        </a>{" "}
        how to create your video{" "}
      </p> */}
    </div>
  );
};

export default UploadBox;
