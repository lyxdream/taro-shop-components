import type { ComponentResolveResult, ComponentResolver } from 'unplugin-vue-components/types'

export interface CqShopComponentsResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * CqShopComponents
   *
   * @default false
   */
  taro?: boolean

  /**
   * compatible with unplugin-auto-import
   *
   * @default false
   */
  autoImport?: boolean
}

const cqFunctions = ['showToast', 'showNotify', 'showDialog', 'showImagePreview']

function getCqResolved(name: string, options: CqShopComponentsResolverOptions): ComponentResolveResult {
  const { importStyle = true, autoImport = false } = options

  const packageName = '@wm/cq-shop-components'

  if (!importStyle) return { name, from: packageName }

  const componentName = autoImport ? name.slice(4) : name

  let style = `${packageName}/dist/packages/${componentName.toLowerCase()}/style/css`

  if (importStyle === 'sass') {
    style = `${packageName}/dist/packages/${componentName.toLowerCase()}/style`
  }

  return {
    name,
    from: packageName,
    sideEffects: style
  }
}

/**
 * Resolver for CqShopComponents 4.0+
 *
 */
export default function CqShopComponentsResolver(options: CqShopComponentsResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name) => {
      const { autoImport = false } = options

      if (autoImport && cqFunctions.includes(name)) return getCqResolved(name, options)

      if (name.startsWith('Cq')) return getCqResolved(name.slice(3), options)
    }
  }
}
