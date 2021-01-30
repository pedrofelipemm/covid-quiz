import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';

import Link from '../src/components/Link';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const Ola = (props) => (
  <div id="name">
    {props.children}
  </div>
);

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const randomLinks = [...db.external];

  React.useEffect(() => {
    randomLinks.sort(() => 0.5 - Math.random());
  }, []);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(event) => setName(event.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length < 3}>
                Jogar
              </Button>
            </form>
            <br />
            { name ? (
              <Ola>
                Olá
                {' '}
                {name}
                !
                {' '}
              </Ola>
            ) : null }
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {randomLinks.slice(0, 3).map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    {name.length < 3
                      ? (
                        <Widget.DisabledTopic as={Link} href={"#"}>
                          {`${githubUser}/${projectName}`}
                        </Widget.DisabledTopic>
                      )
                      : (
                        <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>
                          {`${githubUser}/${projectName}`}
                        </Widget.Topic>
                      )}
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />

      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/pedrofelipemm" />

    </QuizBackground>
  );
}
