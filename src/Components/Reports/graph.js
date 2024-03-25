import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "../../Resources/css/graphStyle.css";
import "../../Resources/library/animate.min.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { RiFilter3Line } from "react-icons/ri";
import { BiFilter } from "react-icons/bi";
import { AiFillFilter } from "react-icons/ai";
import axios from "axios";
import {GET_RETRY_REPORT, GET_LEAD_SUMMARY_REPORT, GET_CALL_VOLUME} from '../apiList'
import ReactApexChart from "react-apexcharts";
import {Button, Modal, ToggleButton, OverlayTrigger, Tooltip, Row, Col,} from 'react-bootstrap';

function Graph() {
  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

  const [showFilterDate, setShowFilterDate] = useState(false);
  const [retrybarGraph, setretrybarGraph] = useState([]);
  const [LeadWisebarGraph, setLeadWiseBarGraph] = useState([]);
  const [Linegraph, setLineGraph] = useState([]);
  const [fromdate, setfromdate] = useState(defaultValue);
  const [endDate, setendDate] = useState(defaultValue);

  const showFilter = () => {
    setShowFilterDate(true);
  };

  const closeFilter = () => {
    setShowFilterDate(false);
  };

  const handlereset = () => {
    setfromdate("");
    setendDate("");
  };

  //1st horizontal bar graph//
  const options = {
    width: '100%',
    height: 230,
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
  };
  let token = window.localStorage.getItem('accessToken')
  let user_group = window.localStorage.getItem('userGroup')
    const tokenType = window.localStorage.getItem('tokenType')
  const retryReport = async () => {
    try {
      
      const response = await axios.post(GET_RETRY_REPORT,
        {
          startDate: `${fromdate} 00:00:00`,
          endDate: `${endDate} 23:59:59`,
        },{
          headers: {
            Authorization: tokenType+ ' ' +token
          }
        }
      );

      const retryData = response.data.value;
      const retryChartData = [
        [
          "Element",
          "Density",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["above", retryData.above, "#0066b2", null],
        ["Attempt 8", retryData.retryEight, "#0066b2", null],
        ["Attempt 7", retryData.retrySeven, "#0066b2", null],
        ["Attempt 6", retryData.retrySix, "#0066b2", null],
        ["Attempt 5", retryData.retryFive, "#0066b2", null],
        ["Attempt 4", retryData.retryFour, "#0066b2", null],
        ["Attempt 3", retryData.retryThree, "#0066b2", null],
        ["Attempt 2", retryData.retryTwo, "#0066b2", null],
        ["Attempt 1", retryData.retryOne, "color:#0066b2", null],
      ];

      setretrybarGraph(retryChartData);
      //console.log("retryReportttttttttttt", response);
    } catch (error) {
      //console.log("error", error);
    }
  };

  //2nd bar graph
  const barchartoptions = {
    title: "Lead Wise Summary Report",
    width: '100%',
    height: 230,
    bar: { groupWidth: "55%" },
    legend: { position: "none" },
    hAxis: {
      title: "Categories",
      textStyle: {
        bold: true,
        fontSize: 12,
        color: "#4B4B4B",
      },
    },
  };

  const formatChartData = (apiResponse) => {
    const labels = Object.keys(apiResponse);
    const dataValues = labels.map((label) => apiResponse[label]);
    //console.log("dataValues", dataValues);

    const barchartData = [
      [
        "",
        ...labels,
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        },
      ],
      ["Data", ...dataValues, "#b87333", null],
    ];

    return barchartData;
  };

  const LeadWiseSummaryReport = () => {
    axios
      .post(GET_LEAD_SUMMARY_REPORT, {
        startDate: `${fromdate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      },{
        headers: {
          Authorization: tokenType+ ' ' +token
        }
      }
      
      )
      .then((res) => {
        const apiResponse = res.data.value;
        //console.log("apiResponse", apiResponse);
        const labels = Object.keys(apiResponse[0]);
        const dataValues = labels.map((label) => apiResponse[0][label]);
        //console.log("dataValues", labels);

        const barchartData = [
          [
            "",
            ...labels.slice(),
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          [
            "Lead Wise System Disposition Summary",
            ...dataValues,
            "#b87333",
            null,
          ],
        ];

        setLeadWiseBarGraph(barchartData);
        //console.log("res lead", res);
      })
      .catch((error) => {
        //console.log("error", error);
      });
  };

  //3rd Line graph
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "2023-01-01 08:00:00",
          "2023-02-01 12:30:00",
          "2023-03-01 16:45:00",
          "2023-04-01 10:15:00",
          "2023-05-01 14:20:00",
          "2023-06-01 09:30:00",
          "2023-07-01 11:45:00",
          "2023-08-01 15:00:00",
          "2023-09-01 07:55:00",
        ],
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            return `${date.getDate()}-${date.toLocaleString("default", {
              month: "short",
            })}-${date.getFullYear()} ${date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}`;
          },
          rotate: -90,
          offsetY: 0,
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of calls",
        },
      },
      markers: {
        size: 4,
        colors: ["#008FFB"],
        strokeColors: "#fff",
        strokeWidth: 2,
      },
    },
  });

  const LinegraphcallVolume = () => {
    axios
      .post(GET_CALL_VOLUME, {
        startDate: `${fromdate} 00:00:00`,
        endDate: `${endDate} 23:59:59`,
      },{
        headers: {
          Authorization: tokenType+ ' ' +token
        }
      }
      )
      .then((res) => {
        const responseData = res.data.value;
        const dates = responseData.map((item) => item.date);
        const answeredCalls = responseData.map((item) => item.answered);
        setChartData({
          series: [
            {
              name: "Answered Calls",
              data: answeredCalls,
            },
          ],
          options: {
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: dates,
              labels: {
                rotate: -90,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                },
              },
            },
            yaxis: {
              title: {
                text: "Number of Answered Calls",
              },
            },
            markers: {
              size: 4,
              colors: ["#008FFB"],
              strokeColors: "#fff",
              strokeWidth: 2,
            },
          },
        });

        //console.log("LineGraph res", res);
      })
      .catch((error) => {
        //console.log("error", error);
      });
  };

  useEffect(() => {
    retryReport();
    LinegraphcallVolume();
    LeadWiseSummaryReport();
  }, []);

  const filterdata = () => {
    retryReport();
    LinegraphcallVolume();
    LeadWiseSummaryReport();
  };

  return (
    <div className={"app_ContentSmall container-fluid"}>
      <div className='addCampaign'>
        {/* <header className=" header_role animate__animated animate__fadeInUp">
          <div className=" conatiner-fluid">
            <nav className="navbar">
              <div className="container-fluid p-0">
                <div className="hed_left d-flex align-items-center">
                  <p className="color_b btn mb-0" type="button">
                    Graph Report
                  </p>
                </div>

                <div className="hed_right d-flex">
                  <button
                    type="button"
                    className="btn btn-primary-1 me-2 d-flex-p btn-sm open-trfilter"
                    onClick={showFilter}
                  >
                    <span className="material-symbols-outlined me-1">
                      {" "}
                      filter_list
                    </span>
                    Filters
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </header> */}

        <div className="">
          <Row>
            <Col className="animate__animated animate__fadeInRight">
              <div className='alignRight'>
                  <OverlayTrigger key={"left"} placement={"left"}  overlay={ <Tooltip id={`tooltip-${"left"}`}>Filters</Tooltip> } >    
                    <Button variant="outline-info" onClick={showFilter} > <span> <RiFilter3Line />
                      
                      </span> 
                    </Button>
                  </OverlayTrigger>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="animate__animated animate__fadeInLeft">
              <div className="card card-box">
                <div className="card-header d-flex">
                  <h5 className="card-title">Retry Analysis</h5>
                  <div className="ms-auto">
                    {/* <span>
                      <RiErrorWarningLine size={20} color="white" />
                    </span> */}
                  </div>
                </div>
                <div className="card-body">
                  {retrybarGraph ? (
                    <Chart
                      chartType="BarChart"
                      data={retrybarGraph}
                      options={options}
                    />
                  ) : (
                    <div
                      className="text-muted"
                      style={{
                        flexDirection: "column",
                        marginTop: "20%",
                        display: "flex",
                        position: "absolute",
                        left: "45%",
                        bottom: "40%",
                      }}
                    >
                      {/* <span className="mx-auto">
                        <RiErrorWarningLine size={25} />
                      </span> */}
                      <span className="mx-auto">
                        <h5
                          className="text-muted mt-2"
                          style={{ fontFamily: "poppins" }}
                        >
                          No Data Found
                        </h5>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Col>

            {/* <Barchart LeadWisebarGraph={LeadWisebarGraph} /> */}

            <Col md={6} className="animate__animated animate__fadeInRight">
              <div className="card card-box">
                <div className="card-header d-flex">
                  <h5 className="card-title">
                    Lead Wise System Disposition Summary
                  </h5>
                  <div className="ms-auto icon-right">
                    {/* <span>
                      <RiErrorWarningLine size={20} color="white" />
                    </span> */}
                  </div>
                </div>
                <div className="card-body">
                  <Chart
                    chartType="Bar"
                    width="100%"
                    height="250px"
                    data={LeadWisebarGraph}
                    options={barchartoptions}
                  />
                </div>
              </div>
            </Col>
          </Row>

          {/* linechart */}
          <Row>
            <Col className="animate__animated animate__fadeInDown">
              <div
                className="card ms-5"
                style={{ boxShadow: "0px 0px 3px grey" }}
              >
                <div className="card-header d-flex">
                  <h5 className="card-title">Connected Call Volume Trend </h5>
                  <div className="ms-auto icon-right">
                    {/* <span>
                      <RiErrorWarningLine size={20} color="white" />
                    </span> */}
                  </div>
                </div>
                <div className="card-body">
                  <div id="wrapper">
                    {Linegraph ? (
                      <div id="chart">
                        <ReactApexChart
                          options={chartData.options}
                          series={chartData.series}
                          type="line"
                          height={250}
                        />
                      </div>
                    ) : (
                      <div
                        className="text-muted"
                        style={{
                          flexDirection: "column",
                          // marginTop: "-20%",
                          display: "flex",
                          position: "absolute",
                          left: "45%",
                          bottom: "40%",
                        }}
                      >
                        {/* <span className="mx-auto">
                          <RiErrorWarningLine size={25} />
                        </span> */}
                        <span className="mx-auto">
                          <h5
                            className="text-muted"
                            style={{
                              fontFamily: "poppins",
                              marginBottom: "-50%",
                            }}
                          >
                            No Data Found
                          </h5>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Modal show={showFilterDate} onHide={closeFilter} animation={true} position='right'>
        <Modal.Header closeButton>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="filter_form">
          <form className=" fillter_form2 ">
            <div>
              <div className="mb-3 d-flex flex-column text-start">
                <label for="fromdate" className="form-label">
                  From
                </label>
                <input
                  type="date"
                  value={fromdate}
                  max={defaultValue}
                  className="form-control"
                  id=""
                  aria-describedby="date"
                  onChange={(e) => {
                    setfromdate(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3 d-flex flex-column text-start">
                <label for="todate" className="form-label">
                  To
                </label>
                <input
                  type="date"
                  value={endDate}
                  max={defaultValue}
                  className="form-control"
                  id=""
                  aria-describedby="date"
                  onChange={(e) => {
                    setendDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
          <div className="filter_submit">
            <div className="d-flex">
              <div className="col-md-6   pe-2 ">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={handlereset}
                >
                  Reset
                </button>
              </div>

              <div className="col-md-6 ps-2">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100"
                  onClick={() => {
                    filterdata();
                    closeFilter();
                  }}
                  // onClick={filterdata}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default Graph;
