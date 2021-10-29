import React from "react";

import styles from "pages/Dashboard/Dashboard.module.scss";
import { Button, Snackbar, Paper } from "components/basic";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loading: false,
    };
  }

  render = () => {
    const { open, loading } = this.state;

    return (
      <div id="content" className={styles.root}>
        <Button
          label={"Test"}
          variant="contained"
          className={styles.button}
          loading={this.state.loading}
          disabled={this.state.loading}
          size="medium"
          onClick={() => {
            this.setState({ open: !open, loading: !loading });
          }}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus vulputate
          ligula, id consequat nunc rutrum vitae. Vestibulum massa erat, auctor vitae posuere id,
          scelerisque vitae quam. Curabitur sit amet tempus risus. Nam rhoncus consectetur ligula,
          non volutpat elit faucibus eget. Maecenas dui magna, iaculis eu mi non, imperdiet cursus
          mauris. Curabitur commodo at leo ut finibus. Quisque elit lectus, sollicitudin sed nulla
          nec, lacinia semper ipsum. Mauris nisi nulla, maximus eu molestie sit amet, porta a nulla.
          Vivamus at quam commodo, pulvinar sapien et, euismod odio. Nullam mollis sapien lectus, at
          bibendum ipsum scelerisque a. Sed molestie, risus id varius volutpat, purus nulla
          consectetur massa, non placerat leo orci sit amet nibh. Morbi vitae placerat purus. Mauris
          scelerisque nisl ac mi rhoncus convallis. Phasellus felis elit, dapibus vitae dui vitae,
          luctus porta tellus. Donec ultricies eget magna sed maximus. Maecenas et quam sit amet
          augue hendrerit suscipit ut at nisl. Nam tincidunt, odio sed fringilla scelerisque, lacus
          quam porta lorem, vel posuere leo libero vel dui. Proin fringilla velit eu ligula
          malesuada, nec elementum nisl laoreet. Mauris tristique fringilla turpis non ornare.
          Nullam tellus erat, tristique eu iaculis et, porttitor id dui. Praesent efficitur, odio
          nec placerat tempor, nulla nisl ullamcorper turpis, at ullamcorper arcu lacus in nunc. Nam
          laoreet nunc a felis gravida porttitor. Proin hendrerit ante id bibendum vulputate.
          Pellentesque finibus odio non faucibus venenatis. Morbi id ligula et nibh pretium iaculis
          at sed mauris. Vestibulum porttitor ante vitae accumsan sollicitudin. Proin ac urna vel
          purus consectetur cursus. Cras imperdiet faucibus auctor. Aliquam pulvinar finibus sem, a
          rutrum diam. Nunc at ultricies mi. Pellentesque ante eros, egestas a leo ut, hendrerit
          venenatis ex. Nam aliquam orci purus, a tincidunt quam sodales faucibus. Vestibulum ornare
          lorem aliquam, finibus nibh vel, molestie nisl. Duis tincidunt est eu volutpat tincidunt.
          Integer elementum egestas magna. Etiam dapibus lorem egestas rutrum fringilla. Sed
          imperdiet, mi vitae vehicula commodo, ex lectus suscipit ipsum, finibus dictum ante lectus
          eget purus. Praesent nibh dolor, faucibus vel rutrum eget, rhoncus at felis. Aenean
          facilisis tempus enim. Sed ante lacus, volutpat vitae iaculis at, dapibus pharetra urna.
          Duis ac blandit lectus. Mauris tortor sem, tristique id fermentum nec, ullamcorper
          tincidunt urna. Aliquam a vulputate metus. In vitae interdum mi, ornare malesuada risus.
          Donec a ante aliquet, pretium est et, suscipit mauris. Nam metus leo, sagittis ac semper
          a, placerat eu sem. Fusce ac maximus eros. Pellentesque at lectus at mi lobortis finibus
          quis eu diam. Cras auctor sem sit amet purus feugiat dignissim. In dapibus sed libero et
          dapibus. Fusce non sollicitudin purus. Aenean vel elit quis nunc tempor ultricies.
          Praesent at libero ut eros pharetra lacinia. Vestibulum efficitur ut augue eget bibendum.
          Fusce posuere, ante vitae rhoncus ornare, neque nibh bibendum metus, sed posuere odio
          turpis sed lorem. Aliquam efficitur nunc auctor sagittis semper. Etiam odio tortor,
          blandit vel enim vitae, blandit suscipit enim. Suspendisse egestas eleifend condimentum.
          Suspendisse vulputate arcu condimentum malesuada fringilla. Proin tempus lacus sapien, non
          finibus dui scelerisque quis. Etiam aliquet, sem ut pharetra placerat, neque tortor
          aliquet lorem, sit amet fringilla neque dui ut ante. Pellentesque libero urna, porta et
          fermentum quis, elementum nec elit. Curabitur condimentum dui purus, sit amet condimentum
          lorem tristique dignissim. In et diam ante. Quisque et arcu euismod, pellentesque massa
          sit amet, ultricies libero. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Aliquam libero eros, pretium in faucibus aliquam,
          efficitur nec nunc. Sed fringilla purus in neque scelerisque, dictum efficitur turpis
          semper. Cras dignissim feugiat nulla nec tincidunt. Ut id iaculis nibh, id ullamcorper
          augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat.
          Praesent faucibus, orci sit amet dictum volutpat, augue turpis tincidunt ipsum, a auctor
          diam sapien nec purus. Aenean sed tellus quis leo auctor lobortis eu ac eros. Phasellus
          non velit odio. Morbi tortor enim, sodales sit amet sem id, eleifend feugiat mauris. Proin
          vitae nibh est. Integer molestie lorem et lacus pharetra, ac porttitor lectus lacinia.
          Donec pellentesque justo velit, a maximus velit feugiat eget. Morbi viverra eu libero non
          eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Suspendisse pulvinar, orci a gravida ornare, elit leo vulputate ligula, sed
          viverra nisl risus quis tellus. Suspendisse consequat commodo urna id volutpat. Quisque
          porttitor quis massa vel aliquet. Donec sagittis, lectus sed fermentum tincidunt, ex nibh
          ultricies enim, sed lacinia nulla risus non leo. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Suspendisse feugiat felis vitae ante
          posuere posuere. Sed sapien elit, venenatis ut blandit quis, commodo sit amet metus. Morbi
          sit amet nibh ac dolor euismod ornare. Sed eget rhoncus enim. Ut interdum nunc eleifend,
          auctor orci et, ullamcorper ipsum. Quisque accumsan justo at augue vestibulum iaculis.
          Integer cursus in leo et commodo. Phasellus quis urna pulvinar, rutrum mauris eget,
          vehicula turpis. Sed quis urna urna. Morbi ornare dignissim nisl. Sed et ex id urna
          feugiat tempus in vel magna. Morbi dolor eros, mollis in feugiat ut, sollicitudin ac
          ipsum. Fusce suscipit neque molestie nunc ultrices suscipit. Aliquam ut pharetra velit.
          Mauris venenatis quam a dolor tempus, non molestie orci finibus. Aliquam aliquet venenatis
          enim, quis ullamcorper massa elementum ac. Nam id aliquam felis. Proin ornare tempus orci,
          ac auctor nisl efficitur non. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Etiam tincidunt ornare convallis. Nunc et sollicitudin nulla. Donec mattis
          bibendum nisl, sed consequat tellus pellentesque eget. Curabitur dignissim tortor
          consequat, tincidunt ante a, iaculis ex. Nunc volutpat faucibus velit. Nunc et enim
          luctus, dictum nisl ac, molestie ipsum. Integer ac est semper tellus tincidunt efficitur.
          Fusce placerat consequat risus. Nullam pulvinar elementum ante. Duis luctus orci ut nulla
          rhoncus, eu viverra arcu efficitur. In in purus nibh. Aenean urna dolor, iaculis non
          pretium a, tristique at enim. Sed ornare est non viverra fringilla. Sed eu suscipit eros.
          Quisque nunc risus, mollis et purus et, dapibus ultrices enim. Suspendisse convallis
          laoreet nunc eu feugiat. Vivamus rutrum in tellus eu finibus. Mauris vel libero ac nulla
          rutrum eleifend. Curabitur porta vulputate imperdiet. Proin in elementum lacus. Praesent a
          lectus ultricies, ullamcorper eros vestibulum, vehicula dui. Curabitur orci lacus, luctus
          nec tellus sed, hendrerit ultricies mi. Pellentesque pellentesque lorem odio, et volutpat
          nisl maximus ac. Sed dapibus a arcu vitae laoreet. Donec quis ipsum eu erat congue semper
          eget id erat. Nullam cursus ex ac lacus dapibus, id lobortis velit sodales. Curabitur
          tristique, est in iaculis bibendum, ligula ante commodo erat, vel iaculis neque neque sed
          metus. Aliquam erat volutpat. Proin quis lectus hendrerit sem sollicitudin porttitor.
          Curabitur posuere blandit porttitor. Donec maximus lectus nisl, at hendrerit dolor luctus
          ac. Suspendisse rutrum dui ut nisl gravida, eu fermentum augue efficitur. Nunc lectus
          tellus, rutrum pellentesque volutpat eu, auctor at sapien. Maecenas pharetra, ligula
          consectetur dictum ornare, purus enim mattis nulla, at tincidunt erat risus at lorem.
          Proin orci risus, placerat a fermentum nec, convallis a ipsum. Duis ultricies sem in
          ligula malesuada sagittis. Donec massa erat, facilisis vel fermentum eget, interdum in
          lectus. Curabitur non hendrerit velit. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Mauris ut odio et dui sollicitudin elementum quis
          sed quam. Quisque in magna nec ante dignissim hendrerit eu non neque. Vivamus tincidunt
          massa eu velit fringilla, ut elementum eros pellentesque. Morbi fringilla, enim a
          pellentesque interdum, libero metus pretium ligula, a eleifend tortor lectus in neque.
          Donec eget cursus neque, non sollicitudin augue. Aenean placerat, sapien bibendum
          venenatis malesuada, risus justo posuere justo, vitae viverra dolor sem id orci.
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus vulputate
          ligula, id consequat nunc rutrum vitae. Vestibulum massa erat, auctor vitae posuere id,
          scelerisque vitae quam. Curabitur sit amet tempus risus. Nam rhoncus consectetur ligula,
          non volutpat elit faucibus eget. Maecenas dui magna, iaculis eu mi non, imperdiet cursus
          mauris. Curabitur commodo at leo ut finibus. Quisque elit lectus, sollicitudin sed nulla
          nec, lacinia semper ipsum. Mauris nisi nulla, maximus eu molestie sit amet, porta a nulla.
          Vivamus at quam commodo, pulvinar sapien et, euismod odio. Nullam mollis sapien lectus, at
          bibendum ipsum scelerisque a. Sed molestie, risus id varius volutpat, purus nulla
          consectetur massa, non placerat leo orci sit amet nibh. Morbi vitae placerat purus. Mauris
          scelerisque nisl ac mi rhoncus convallis. Phasellus felis elit, dapibus vitae dui vitae,
          luctus porta tellus. Donec ultricies eget magna sed maximus. Maecenas et quam sit amet
          augue hendrerit suscipit ut at nisl. Nam tincidunt, odio sed fringilla scelerisque, lacus
          quam porta lorem, vel posuere leo libero vel dui. Proin fringilla velit eu ligula
          malesuada, nec elementum nisl laoreet. Mauris tristique fringilla turpis non ornare.
          Nullam tellus erat, tristique eu iaculis et, porttitor id dui. Praesent efficitur, odio
          nec placerat tempor, nulla nisl ullamcorper turpis, at ullamcorper arcu lacus in nunc. Nam
          laoreet nunc a felis gravida porttitor. Proin hendrerit ante id bibendum vulputate.
          Pellentesque finibus odio non faucibus venenatis. Morbi id ligula et nibh pretium iaculis
          at sed mauris. Vestibulum porttitor ante vitae accumsan sollicitudin. Proin ac urna vel
          purus consectetur cursus. Cras imperdiet faucibus auctor. Aliquam pulvinar finibus sem, a
          rutrum diam. Nunc at ultricies mi. Pellentesque ante eros, egestas a leo ut, hendrerit
          venenatis ex. Nam aliquam orci purus, a tincidunt quam sodales faucibus. Vestibulum ornare
          lorem aliquam, finibus nibh vel, molestie nisl. Duis tincidunt est eu volutpat tincidunt.
          Integer elementum egestas magna. Etiam dapibus lorem egestas rutrum fringilla. Sed
          imperdiet, mi vitae vehicula commodo, ex lectus suscipit ipsum, finibus dictum ante lectus
          eget purus. Praesent nibh dolor, faucibus vel rutrum eget, rhoncus at felis. Aenean
          facilisis tempus enim. Sed ante lacus, volutpat vitae iaculis at, dapibus pharetra urna.
          Duis ac blandit lectus. Mauris tortor sem, tristique id fermentum nec, ullamcorper
          tincidunt urna. Aliquam a vulputate metus. In vitae interdum mi, ornare malesuada risus.
          Donec a ante aliquet, pretium est et, suscipit mauris. Nam metus leo, sagittis ac semper
          a, placerat eu sem. Fusce ac maximus eros. Pellentesque at lectus at mi lobortis finibus
          quis eu diam. Cras auctor sem sit amet purus feugiat dignissim. In dapibus sed libero et
          dapibus. Fusce non sollicitudin purus. Aenean vel elit quis nunc tempor ultricies.
          Praesent at libero ut eros pharetra lacinia. Vestibulum efficitur ut augue eget bibendum.
          Fusce posuere, ante vitae rhoncus ornare, neque nibh bibendum metus, sed posuere odio
          turpis sed lorem. Aliquam efficitur nunc auctor sagittis semper. Etiam odio tortor,
          blandit vel enim vitae, blandit suscipit enim. Suspendisse egestas eleifend condimentum.
          Suspendisse vulputate arcu condimentum malesuada fringilla. Proin tempus lacus sapien, non
          finibus dui scelerisque quis. Etiam aliquet, sem ut pharetra placerat, neque tortor
          aliquet lorem, sit amet fringilla neque dui ut ante. Pellentesque libero urna, porta et
          fermentum quis, elementum nec elit. Curabitur condimentum dui purus, sit amet condimentum
          lorem tristique dignissim. In et diam ante. Quisque et arcu euismod, pellentesque massa
          sit amet, ultricies libero. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Aliquam libero eros, pretium in faucibus aliquam,
          efficitur nec nunc. Sed fringilla purus in neque scelerisque, dictum efficitur turpis
          semper. Cras dignissim feugiat nulla nec tincidunt. Ut id iaculis nibh, id ullamcorper
          augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat.
          Praesent faucibus, orci sit amet dictum volutpat, augue turpis tincidunt ipsum, a auctor
          diam sapien nec purus. Aenean sed tellus quis leo auctor lobortis eu ac eros. Phasellus
          non velit odio. Morbi tortor enim, sodales sit amet sem id, eleifend feugiat mauris. Proin
          vitae nibh est. Integer molestie lorem et lacus pharetra, ac porttitor lectus lacinia.
          Donec pellentesque justo velit, a maximus velit feugiat eget. Morbi viverra eu libero non
          eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Suspendisse pulvinar, orci a gravida ornare, elit leo vulputate ligula, sed
          viverra nisl risus quis tellus. Suspendisse consequat commodo urna id volutpat. Quisque
          porttitor quis massa vel aliquet. Donec sagittis, lectus sed fermentum tincidunt, ex nibh
          ultricies enim, sed lacinia nulla risus non leo. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Suspendisse feugiat felis vitae ante
          posuere posuere. Sed sapien elit, venenatis ut blandit quis, commodo sit amet metus. Morbi
          sit amet nibh ac dolor euismod ornare. Sed eget rhoncus enim. Ut interdum nunc eleifend,
          auctor orci et, ullamcorper ipsum. Quisque accumsan justo at augue vestibulum iaculis.
          Integer cursus in leo et commodo. Phasellus quis urna pulvinar, rutrum mauris eget,
          vehicula turpis. Sed quis urna urna. Morbi ornare dignissim nisl. Sed et ex id urna
          feugiat tempus in vel magna. Morbi dolor eros, mollis in feugiat ut, sollicitudin ac
          ipsum. Fusce suscipit neque molestie nunc ultrices suscipit. Aliquam ut pharetra velit.
          Mauris venenatis quam a dolor tempus, non molestie orci finibus. Aliquam aliquet venenatis
          enim, quis ullamcorper massa elementum ac. Nam id aliquam felis. Proin ornare tempus orci,
          ac auctor nisl efficitur non. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Etiam tincidunt ornare convallis. Nunc et sollicitudin nulla. Donec mattis
          bibendum nisl, sed consequat tellus pellentesque eget. Curabitur dignissim tortor
          consequat, tincidunt ante a, iaculis ex. Nunc volutpat faucibus velit. Nunc et enim
          luctus, dictum nisl ac, molestie ipsum. Integer ac est semper tellus tincidunt efficitur.
          Fusce placerat consequat risus. Nullam pulvinar elementum ante. Duis luctus orci ut nulla
          rhoncus, eu viverra arcu efficitur. In in purus nibh. Aenean urna dolor, iaculis non
          pretium a, tristique at enim. Sed ornare est non viverra fringilla. Sed eu suscipit eros.
          Quisque nunc risus, mollis et purus et, dapibus ultrices enim. Suspendisse convallis
          laoreet nunc eu feugiat. Vivamus rutrum in tellus eu finibus. Mauris vel libero ac nulla
          rutrum eleifend. Curabitur porta vulputate imperdiet. Proin in elementum lacus. Praesent a
          lectus ultricies, ullamcorper eros vestibulum, vehicula dui. Curabitur orci lacus, luctus
          nec tellus sed, hendrerit ultricies mi. Pellentesque pellentesque lorem odio, et volutpat
          nisl maximus ac. Sed dapibus a arcu vitae laoreet. Donec quis ipsum eu erat congue semper
          eget id erat. Nullam cursus ex ac lacus dapibus, id lobortis velit sodales. Curabitur
          tristique, est in iaculis bibendum, ligula ante commodo erat, vel iaculis neque neque sed
          metus. Aliquam erat volutpat. Proin quis lectus hendrerit sem sollicitudin porttitor.
          Curabitur posuere blandit porttitor. Donec maximus lectus nisl, at hendrerit dolor luctus
          ac. Suspendisse rutrum dui ut nisl gravida, eu fermentum augue efficitur. Nunc lectus
          tellus, rutrum pellentesque volutpat eu, auctor at sapien. Maecenas pharetra, ligula
          consectetur dictum ornare, purus enim mattis nulla, at tincidunt erat risus at lorem.
          Proin orci risus, placerat a fermentum nec, convallis a ipsum. Duis ultricies sem in
          ligula malesuada sagittis. Donec massa erat, facilisis vel fermentum eget, interdum in
          lectus. Curabitur non hendrerit velit. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Mauris ut odio et dui sollicitudin elementum quis
          sed quam. Quisque in magna nec ante dignissim hendrerit eu non neque. Vivamus tincidunt
          massa eu velit fringilla, ut elementum eros pellentesque. Morbi fringilla, enim a
          pellentesque interdum, libero metus pretium ligula, a eleifend tortor lectus in neque.
          Donec eget cursus neque, non sollicitudin augue. Aenean placerat, sapien bibendum
          venenatis malesuada, risus justo posuere justo, vitae viverra dolor sem id orci.
        </p>
      </div>
    );
  };
}

export default Dashboard;
