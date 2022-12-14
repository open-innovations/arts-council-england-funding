import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import csvLoader from 'oi-lume-utils/loaders/csv-loader.ts';
import autoDependency from 'oi-lume-utils/processors/auto-dependency.ts';
import esbuild from 'lume/plugins/esbuild.ts';


const site = lume({
  location: new URL("https://open-innovations.github.io/arts-council-england-funding"),
  src: './src',
});

// Add dependencies
site.process(['.html'], autoDependency);

site.loadData([".csv"], csvLoader);

site.use(base_path());
site.use(metas({
  defaultPageData: {
    title: 'title', // Use the `date` value as fallback.
  },
}));
site.use(date());

site.use(esbuild({
  extensions: [".ts", ".js"],
  options: {
    bundle: true,
    format: "iife",
    minify: true,
    keepNames: false,
    platform: "browser",
    target: "es6",
    incremental: true,
    treeShaking: true,
  },
}));

site.use(postcss({}));

site.filter('localize', (num) => num.toLocaleString())

site.ignore('README.md');
['.nojekyll'].forEach(f => site.copy(f));



export default site;
