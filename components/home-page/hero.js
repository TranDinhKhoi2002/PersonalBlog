import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/personal-image.jpg"
          alt="Tran Dinh Khoi image"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Khoi</h1>
      <p>
        I am a FrontEnd Developer - especially frontend library ReactJS and
        framework NextJS
      </p>
    </section>
  );
}

export default Hero;
