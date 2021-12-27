import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

export const Wrapping = () => {
  const [certificatedData, setCertificatedData] = useState([]);
  const [notCertificatedData, setNotCertificatedData] = useState([]);
  const [onlineData, setOnlineData] = useState([]);
  const [offlineData, setOfflineData] = useState([]);
  const [launchData, setLaunchData] = useState([]);
  const [rushData, setRushData] = useState([]);
  const [autobusinessData, setAutobuisnessData] = useState([]);
  const [marketingData, setMarketingData] = useState([]);
  const [b2bData, setB2bData] = useState([]);

  const [certificated, setCertificated] = useState(false);
  const [notCertificated, setNotCertificated] = useState(false);
  const [online, setOnline] = useState(false);
  const [offline, setOffline] = useState(false);
  const [launch, setLaunch] = useState(false);
  const [rush, setRush] = useState(false);
  const [autobusiness, setAutobusiness] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [b2b, setB2b] = useState(false);

  const getCertificates = async () => {
    axios
      .get("https://61851c6723a2fe0017fff39d.mockapi.io/certificates")
      .then((response) => {
        const data = response.data;
        setCertificatedData(data);
        setOnline(data)
        setOffline(data)
      });
  };
  const getNotCertificates = async () => {
    axios
      .get("https://61851c6723a2fe0017fff39d.mockapi.io/notcertificates")
      .then((response) => {
        const data = response.data;
        setNotCertificatedData(data);
        setLaunchData(data)
        setRushData(data)
      });
  };

  const setCertificatedStatus = () => {
    setCertificated(!certificated);
    console.log(certificated, certificatedData, notCertificatedData);
  };
  const setNotCertificatedStatus = () => {
    setNotCertificated(!notCertificated);
    console.log(notCertificated);
  };
  const setOnlineStatus = () => {
    setOnline(!online);
    console.log(online);
  };
  const setOfflineStatus = () => {
    setOffline(!offline);
    console.log(offline);
  };
  const setLaunchStatus = () => {
    setLaunch(!launch);
    console.log(launch);
  };
  const setRushStatus = () => {
    setRush(!rush);
    console.log(rush);
  };
  const setAutobusinessStatus = () => {
    setAutobusiness(!autobusiness);
    console.log(autobusiness);
  };
  const setMarketingStatus = () => {
    setMarketing(!marketing);
    console.log(marketing);
  };
  const setB2bStatus = () => {
    setB2b(!b2b);
    console.log(b2b);
  };

  useEffect(() => {
    getCertificates();
    getNotCertificates();
  }, []);

  const certificatedTime = certificatedData.map(
    (item) => item.createdAt.slice(0, 10) + " " + item.createdAt.slice(11, 19)
  );
  const certificatedNumber = certificatedData.map((item) => item.certificates);
  const noncertificatedNumber = notCertificatedData.map(
    (item) => item.noncertificates
  );
  console.log(certificatedNumber);
  console.log(noncertificatedNumber);

  return (
    <>
      <div>
        <div>Сертифицированность</div>
        <div>
          <input
            type="checkbox"
            checked={certificated}
            onChange={setCertificatedStatus}
          />{" "}
          Сертифицированные
          <input
            type="checkbox"
            checked={notCertificated}
            onChange={setNotCertificatedStatus}
          />{" "}
          Несертифицированные
          <div>Формат обучения</div>
          <div>
            <input type="checkbox" checked={online} onChange={setOnlineStatus} />{" "}
            Онлайн
            <div>
              <input type="checkbox" checked={offline} onChange={setOfflineStatus} />{" "}
              Оффлайн
            </div>
          </div>
          <div>Направление</div>
          <div>
            <input type="checkbox" checked={launch} onChange={setLaunchStatus} />{" "}
            Запуск
            <div>
              <input type="checkbox" checked={rush} onChange={setRushStatus} />{" "}
              Прорыв
            </div>
          </div>
        </div>

        <div>
          <Line
            data={{
              labels: certificated || notCertificated || online || offline || launch || rush ? certificatedTime : null,
              datasets: [
                {
                  label: "Number of certificated mentors",
                  data: certificated ? certificatedNumber : null,
                  borderColor: "rgba(0, 200, 155, .75)",
                  backgroundColor: "green",
                },
                {
                  label: "Number of non-certificated mentors",
                  data: notCertificated ? noncertificatedNumber : null,
                  borderColor: "rgba(255, 100, 100, .75)",
                  backgroundColor: "red",
                },
                {
                  label: "Number of online mentors",
                  data: online ? certificatedNumber : null,
                  borderColor: "rgba(100, 100, 0, .75)",
                  backgroundColor: "turquoise",
                },
                {
                  label: "Number of offline mentors",
                  data: offline ? noncertificatedNumber : null,
                  borderColor: "rgba(255, 100, 100, .75)",
                  backgroundColor: "orange",
                },
                {
                  label: "Number of launch mentors",
                  data: launch ? certificatedNumber : null,
                  borderColor: "rgba(0, 200, 145, .75)",
                  backgroundColor: "orange",
                },
                {
                  label: "Number of rush mentors",
                  data: rush ? noncertificatedNumber : null,
                  borderColor: "rgba(255, 55, 210, .75)",
                  backgroundColor: "orange",
                },
              ],
            }}
            width={250}
            height={500}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </>
  );
};
