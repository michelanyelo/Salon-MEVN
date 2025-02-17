import { rootClasses } from './formkit.theme.mjs'
import {genesisIcons} from "@formkit/icons";
import { es } from '@formkit/i18n'

const config = {
  config: {
    rootClasses,
    locales: { es },
    locale: 'es',
    icons:{
      ...genesisIcons
    }
  },
}

export default config
