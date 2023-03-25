import React, { useContext, useEffect } from 'react'
import '@fontsource/quantico'
import { useNavigate } from 'react-router'
import { LoginContext } from '../../helpers/Context'
import Lines from './images/lines.png'
import Lines2 from './images/lines2.png'
import Lines3 from './images/lines3.png'
import Search from './images/search.png'
import Comment from './images/comment.png'
import People from './images/people1.png'
import UC from './images/UC.gif'
import { motion } from 'framer-motion'
import Step_1 from './images/Step_1.png'
import step_22 from './images/step_22.png'
import Step_2 from './images/Step_2.png'
import Step_3 from './images/Step_3.png'
import Step_4 from './images/Step_4.png'
import Step_5 from './images/Step_5.png'
import Yearbook from './images/Yearbook2022.pdf'
import Navbar from '../navbar/navbar'
import yearbook from './images/yearbook.png' 
function Homepage() {
  const { loading, setLoading } = useContext(LoginContext)

  useEffect(() => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 1000))

      setLoading((loading) => !loading)
    }

    Load()
  }, [])

  // const line1 = 'WELCOME TO THE'
  // const line2 = "YEARBOOK PORTAL '23"
  // const line3 = 'OF IIT INDORE ...'

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  }

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }
  return (
    <>
      {loading && (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      )}
      {!loading && (
        <div className="overflow-x-hidden w-screen flex flex-col overflow-clip lg:-mt-24 mt-0">
          <div className="flex flex-col overflow-x-hidden">
            <div className="flex flex-col lg:flex-row w-full justify-around items-center lg:mb-8 lg:h-screen h-[200vh]">
              <div className="w-4/5 lg:w-2/5 lg:mt-0 mt-8 border-2 lg:h-3/5 h-2/5 rounded-xl flex flex-col items-start justify-center relative">
                <div className="text-white font-bold uppercase text-4xl lg:text-5xl lg:text-left lg:pl-4 mt-8 text-center lg:mr-4">
                  <motion.h3>
                    WELCOME TO THE YEARBOOK PORTAL '23 OF IIT INDORE ...
                  </motion.h3>
                </div>
                <div className=" lg:mb-0 mb-2 text-white uppercase text-3xl text-left pl-4 lg:pr-4 mt-8 lg:mt-8 w-full flex-wrap overscroll-contain">
                  ALUMNI CELL, IIT INDORE <br></br>
                  <br></br>
                  <span className="capitalize text-xl">
                    A one-stop hub to curate your Yearbook profile and help
                    others do the same!
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-1/3 lg:h-3/4 mt-8 lg:mt-0 flex flex-col items-center lg:items-start">
                <div className="text-4xl uppercase text-white text-center lg:mt-12 lg:text-left w-4/5 lg:w-3/4">
                  This is your new memories page!
                </div>
                <div className="h-96 w-96 rounded-full mt-12 lg:mb-0 mb-12">
                  <img src={People} className="w-full"></img>
                </div>
              </div>
            </div>
          </div>

          {/* steps */}

          <div className="w-full">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
              className=" lg:ml-16 lg:w-1/2 text-center lg:text-left lg:px-0 px-4 text-4xl text-white capitalize"
            >
              connecting with your friends has never been{' '}
              <span className="text-[#fec80a]">more</span> easy before!
            </motion.div>
            <div className="flex flex-col lg:flex-row mt-2">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 500 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                  delay: 0.3,
                }}
                className="overflow-hidden lg:block hidden"
              >
                <img
                  className="ml-16 lg:w-32 object-contain z-10 rounded-none"
                  src={Lines}
                ></img>
              </motion.div>
              <div className="flex w-full lg:hidden flex-col items-center justify-center">
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 200,
                    delay: 0.3,
                  }}
                  className="w-3/4 h-64 rounded-xl"
                ><img
                  className="w-full h-full object-contain rounded-xl border-2"
                  src={Step_1}
                ></img></motion.div>
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 200,
                    delay: 0.3,
                  }}
                  className="w-3/4 mt-4 h-64 rounded-xl"
                ><img
                  className="w-full h-full object-contain rounded-xl border-2"
                  src={Step_2}
                ></img></motion.div>
              </div>
              <div className="lg:mt-48 lg:-ml-32 lg:w-3/4 w-full">
                <motion.h1
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 100,
                    delay: 0.3,
                  }}
                  className="text-white lg:pl-8 uppercase text-center lg:text-left"
                >
                  step 1
                </motion.h1>
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 100,
                    delay: 0.3,
                  }}
                  className="text-2xl text-white bg-transparent lg:ml-24 lg:mt-12 lg:w-2/5 w-full lg:px-0 px-4 text-center lg:text-left"
                >
                  Log in using your{' '}
                  <span className="text-[#fec80a]">institute</span> ID, and upon
                  the first login, you will be asked to complete your
                  information details. Following this, you will have created
                  your profile for the Yearbook!
                </motion.div>
              </div>
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.3,
                }}
                className="w-96 h-64 rounded-xl -ml-64 mt-16 hidden lg:block"
              >
                <img
                  className="w-full h-full object-contain rounded-xl border-2"
                  src={Step_1}
                ></img>
              </motion.div>
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.3,
                }}
                className="w-96 h-64 rounded-xl -ml-80 mt-64 bg-[#180c1e] hidden lg:block border-2"
              >
                <img
                  className="w-full h-full object-contain rounded-xl"
                  src={Step_2}
                ></img>
              </motion.div>
            </div>
            <div className="w-full h-8 mt-4 object-contain hidden lg:block">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: 'spring' }}
                className="object-contain h-full w-8 ml-14"
                src={Search}
              ></motion.img>
            </div>
          </div>

          <div className="w-full">
            <div className="flex lg:flex-row flex-col mt-4 items-start">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 500 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                  delay: 0.3,
                }}
                className="overflow-hidden hidden lg:block"
              >
                <img
                  className="ml-14 w-16 object-contain z-10 rounded-none"
                  src={Lines2}
                ></img>
              </motion.div>
              <div className="lg:w-3/4 lg:mt-48 lg:-ml-12 w-full">
                <div className="w-full flex items-center justify-center lg:hidden">
                  <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 200,
                      delay: 0.3,
                    }}
                    className="w-3/4 h-96 rounded-xl"
                  ><img
                  className="w-full h-full object-contain rounded-xl border-2"
                  src={Step_3}
                ></img></motion.div>
                </div>
                <motion.h1
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 100,
                    delay: 0.3,
                  }}
                  className="text-white lg:pl-8 text-center lg:text-left uppercase"
                >
                  step 2
                </motion.h1>
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 100,
                    delay: 0.3,
                  }}
                  className="text-2xl text-white bg-transparent lg:ml-24 lg:mt-12 lg:w-2/5 w-full px-4 text-center lg:text-left lg:px-0"
                >
                  Now for the fun part! Using the{' '}
                  <span className="text-[#fec80a]">Search Bar</span>, you can
                  look up other batchmates who have registered on the Portal and
                  can comment on their page!
                </motion.div>
              </div>
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.3,
                }}
                className="w-1/3 h-96 rounded-xl -ml-96 mt-32 hidden lg:block border-2"
              >
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={Step_3}
                ></img>
              </motion.div>
            </div>
            <div className="w-full h-8 mt-4 ml-2 object-contain lg:block hidden">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: 'spring' }}
                className="object-contain h-full"
                src={Comment}
              ></motion.img>
            </div>
          </div>

          <div className="w-full mt-4">
            <div className="flex lg:flex-row flex-col mt-2 mb-4">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 500 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                  delay: 0.3,
                }}
                className="overflow-hidden hidden lg:block"
              >
                <img
                  className="ml-14 w-8 object-contain z-10 rounded-none"
                  src={Lines3}
                ></img>
              </motion.div>
              <div className="flex flex-col">
                <div className="flex lg:flex-row flex-col-reverse">
                  <div className="lg:mt-48 lg:w-3/4 w-full">
                    <motion.h1
                      viewport={{ once: true }}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        type: 'spring',
                        stiffness: 100,
                        delay: 0.3,
                      }}
                      className="text-white lg:pl-8 text-center lg:text-left uppercase"
                    >
                      remember<span className="text-[#fec80a]">!</span>
                    </motion.h1>
                    <motion.div
                      viewport={{ once: true }}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        type: 'spring',
                        stiffness: 100,
                        delay: 0.3,
                      }}
                      className="text-2xl text-white bg-transparent lg:ml-24 lg:mt-12 lg:w-2/5 w-full px-4 lg:px-4 text-center lg:text-left"
                    >
                      Others can comment on your page, and you will have the
                      power to <span className="text-[#fec80a]">approve</span>{' '}
                      those comments.
                    </motion.div>
                  </div>
                  <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 200,
                      delay: 0.3,
                    }}
                    className="w-96 h-64 rounded-xl -ml-64 mt-16 hidden lg:block"
                  >
                    <img
                      className="w-full h-full object-contain rounded-xl border-2"
                      src={Step_4}
                    ></img>
                  </motion.div>
                  <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 200,
                      delay: 0.3,
                    }}
                    className="w-96 h-64 rounded-xl -ml-72 mt-32 bg-[#180c1e] hidden lg:block border-2"
                  >
                    <img
                      className="w-full h-full object-contain rounded-xl"
                      src={Step_5}
                    ></img>
                  </motion.div>
                  <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 100,
                      delay: 0.3,
                    }}
                    className="w-full lg:hidden flex flex-col items-center justify-center"
                  >
                    <div className="w-3/4 h-64 rounded-xl"><img
                  className="w-full h-full object-contain rounded-xl border-2"
                  src={Step_4}
                ></img></div>
                    <div className="w-3/4 h-64 rounded-xl mt-4 bg-gray-800"><img
                  className="w-full h-full object-contain rounded-xl border-2"
                  src={Step_5}
                ></img></div>
                  </motion.div>
                </div>
                <div className="flex flex-col w-full h-96 items-center justify-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="text-4xl text-white capitalize w-full px-4 lg:px-0 lg:w-2/3 text-center"
                  >
                    So, register now and join in on the{' '}
                    <span className="text-[#fec80a]">nostalgic</span> trips of
                    your time at IIT Indore!
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 100,
                    }}
                  >
                    <a>
                      <button
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                          })
                        }}
                        className="bg-transparent border-2 rounded-xl border-white w-32 h-14 text-white uppercase hover:bg-[#fec80a] hover:text-[#180c1e] hover:border-transparent ease-in-out duration-300 "
                      >
                        Sign In
                      </button>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-screen flex-col bg-[#160923] z-0 lg:-mt-[4rem]">
            <div className="lg:pt-16 flex flex-col lg:flex-row items-center justify-around lg:h-3/5 w-full bg-gradient-to-tr from-purple-800 lg:pb-16">
              <a href={Yearbook} target="_blank">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                  className="flex w-72 lg:mt-0 mt-8 lg:mb-0 mb-8 h-96 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-700 justify-center items-center rounded-xl bg-yearbook"
                >
                </motion.div>
              </a>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                className="flex flex-col w-72 lg:mt-0 mt-8 lg:mb-0 mb-8 h-96 bg-gray-800 justify-start relative items-center rounded-xl"
              >
                <img
                  src={UC}
                  className="w-48 h-48 rounded-full object-cover my-12"
                ></img>
                <h1 className="text-white text-center z-0">Coming Soon</h1>
                <motion.div
                  whileHover={{ transition: { duration: 0.4 }, opacity: 0 }} 
                  className="absolute rounded-xl w-full h-full z-10 bg-gradient-to-tl from-yellow-200 via-yellow-400 to-yellow-700 items-center justify-center flex"
                >
                  <h1 className="text-black text-center z-10">
                    Alumni Magazine
                  </h1>
                </motion.div>
              </motion.div>
              <div className="w-4/5 lg:w-1/3 flex flex-col lg:h-64">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                  className="w-full h-1/2 flex flex-col lg:flex-row justify-start lg:justify-between items-center"
                >
                  <div className="flex-col w-1/2">
                    <h1 className="uppercase p-0 text-5xl">2.75K+</h1>
                    <p className="bg-transparent capitalize text-white">
                      captions in 2022
                    </p>
                  </div>
                  <div className="flex-col w-1/2">
                    <h1 className="uppercase p-0 text-5xl">2.2K+</h1>
                    <p className="bg-transparent capitalize text-white">
                      students
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                  className="w-full h-1/2 flex flex-col lg:flex-row justify-start lg:justify-between items-center"
                >
                  <div className="flex-col w-1/2">
                    <h1 className="uppercase p-0 text-5xl">2.5K+</h1>
                    <p className="bg-transparent capitalize text-white">
                      alumni
                    </p>
                  </div>
                  <div className="flex-col w-1/2">
                    <h1 className="uppercase p-0 text-5xl">11+</h1>
                    <p className="bg-transparent capitalize text-white">
                      departments
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Homepage
