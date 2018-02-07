export const slugify = (txt: string) => {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;&'
  const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh_______'
  const p = new RegExp(a.split('').join('|'), 'g')

  return txt.toString().toLowerCase()
    .replace(/\s+/g, '_')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/[^\w\-]+/g, '')
    .replace(/\_\_+/g, '_')
    .replace(/^_+/, '')
    .replace(/_+$/, '')
}

export default slugify
