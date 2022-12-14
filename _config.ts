import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume({
  location: new URL("https://open-innovations.github.io/arts-council-england-funding"),
});

site.use(base_path());
site.use(metas({
  defaultPageData: {
    title: 'title', // Use the `date` value as fallback.
  },
}));
site.use(date());
site.use(postcss({}));

site.ignore('README.md');
['.nojekyll'].forEach(f => site.copy(f));

export default site;
