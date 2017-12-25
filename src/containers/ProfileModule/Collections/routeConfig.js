
import I18n from '@language'
import DFont from '@theme/fonts'
import { HEADER_COLOR } from '@theme/colors'

export default function (props) {
  return {
    title: I18n.t('DRAWER_COLLECTION_TITLE'),
    headerTitle: I18n.t('DRAWER_COLLECTION_TITLE'),
    headerTitleStyle: DFont.DFontFamily,
    headerTintColor: HEADER_COLOR
  }
}