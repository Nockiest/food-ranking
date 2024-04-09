import React from 'react';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
    const pagesDir = path.join(process.cwd(), 'pages');
    const files = fs.readdirSync(pagesDir);
    const routes = files
      .filter((file) => file.endsWith('.tsx') && !file.includes('[...'))
      .map((file) => '/' + file.replace(/\.tsx$/, ''));
    return {
      props: { routes },
    };
  }
