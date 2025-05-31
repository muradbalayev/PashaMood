import React, { useEffect } from "react";
import Transition from "../../components/Transition";
import Hero from "../../components/client/Hero";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis, { useLenis } from "lenis/react";
import gsap from "gsap";

const Home = () => {

  //disable eslint next-line unused-vars
  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'auto'
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);



  return (
    <ReactLenis root>
      <div className="pt-16 bg-white">
        <Hero />
      </div>
    </ReactLenis>
  );
};

const TransitionedHome = Transition(Home);
export default TransitionedHome;