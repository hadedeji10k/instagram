import React, { useState } from "react";
import Swal from "sweetalert2";
import User from "./User";

import "bootstrap/dist/css/bootstrap.min.css";

const Homepage = (props) => {

  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const onChange = ({ target: { value } }) => setUsername(value);

  const onClick = () => {
    Swal.fire({
      title: "<strong>Fetching Data!</strong>",
      icon: "info",
      html: "Wait till Data is already fetched and Processec",
      showCloseButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
    });
    // Swal.fire('Any fool can use a computer')
    fetch(`/api/getData/${username}`)
      .then((res) => res.json())
      .then((data) => {
        Swal.close();
        console.log("data", data);
        setData(data);

        // axios.get(img, header)
        // .then((res) => {

        // })
        // .catch((error) => {
        // console.log(error)
        // })
      })
      .catch((err) => {
        console.log(err);
        Swal.close();
        setData(null);
      });
  };
    const data2 = [
      {
        avatar:
          "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.2885…hdSGZV0suUX6aK51ZDrehw&oe=61DDFF06&_nc_sid=04cb80",
        username: "aishabintshafi",
      },
      { avatar: "", username: "a.m.m.a.n.circle" },
      {
        avatar:
          "https://instagram.fabv2-1.fna.fbcdn.net/v/t51.2885…P4AU1ZlXQgllmjhZfjYAcA&oe=61DD28A0&_nc_sid=04cb80",
        username: "nanabintshafi",
      },
      {
        avatar:
          "https://instagram.fabv2-1.fna.fbcdn.net/v/t51.2885…A5JnYkyDN1Ru5EQYY01ycw&oe=61DE8F8A&_nc_sid=04cb80",
        username: "umm.summis",
      },
      {
        avatar:
          "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.2885…QeXbNeUHUBom0OJvRxHIRg&oe=61DEA41F&_nc_sid=04cb80",
        username: "umm.mus3ab_",
      },
      {
        avatar:
          "https://instagram.fabv2-1.fna.fbcdn.net/v/t51.2885…JJV-lkHx0sli8ok5APH--w&oe=61DCF5DD&_nc_sid=04cb80",
        username: "ftm.ngm",
      },
      {
        avatar:
          "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.2885…eYZapWXB_s9t0IxgozxSXw&oe=61DDB98F&_nc_sid=04cb80",
        username: "umm_hanin_",
      },
      { avatar: "", username: "___ummmaryam" },
      {
        avatar:
          "https://instagram.fabv2-2.fna.fbcdn.net/v/t51.2885…WgJOCRpp3vLAopIQIF9isA&oe=61DE2C94&_nc_sid=04cb80",
        username: "ummsumayyyah",
      },
      {
        avatar:
          "https://instagram.fabv2-1.fna.fbcdn.net/v/t51.2885…M9UnHGHjlItD3EQogt0sog&oe=61DE07EF&_nc_sid=04cb80",
        username: "ameeta.as",
      },
      {
        avatar:
          "https://scontent-ham3-1.cdninstagram.com/v/t51.288…k17pQR4ZFuCkjS_osBvOSQ&oe=61DD90CF&_nc_sid=6136e7",
        username: "bint_sheriff",
      },
    ];
  return (
    <>
      <div>
        <div>
          <h2>Time to start coding!</h2>
          <input value={username} onChange={onChange} /> <br />
          <br />
          <button onClick={onClick}>Get instagram followers!</button>
        </div>
        {/* {!data2 ? (
        <></>
      ) : ( */}
        {/* <div>
          {data2.map((item) => {
            <User img={item.avatar} name={item.username} />;
            <h1>{item.username}</h1>
            console.log(item.username)
          })}
        </div> */}
        {/* )} */}
      </div>

      <div className=" container mt-5">
        <section className="container d-flex flex-wrap">
          {!data2 ? (
            <></>
          ) : (
            data2.map((item) => (
              <div className="col-12 col-md-6 col-lg-4 p-1">
                <User img={item.avatar} name={item.username} />
              </div>
            ))
          )}
        </section>
      </div>

      <div className=" container mt-5">
        <section className="container d-flex flex-wrap">
          {!data ? (
            <></>
          ) : (
              <><div className="col-6 col-md-4 col-lg-3 p-1">
                <div className="userBox">
                  <h3>{data.followerCnt}</h3>
                </div>
              </div><div className="col-6 col-md-4 col-lg-3 p-1">
                  <div className="userBox">
                    <h3>{data.followingCnt}</h3>
                  </div>
                </div></>
          )}
        </section>
      </div>

      <div className=" container mt-5">
        <section className="container d-flex flex-wrap">
          {!data ? (
            <></>
          ) : (
            data.followers.map((item) => (
              <div className="col-12 col-md-6 col-lg-4 p-1">
                <User img={item.avatar} name={item.username} />
              </div>
            ))
          )}
        </section>
      </div>

    </>
  );
};

export default Homepage;
