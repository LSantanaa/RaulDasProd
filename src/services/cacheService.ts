import NodeCache from 'node-cache';

const myCache = new NodeCache();
const cacheKey = 'publicacoes';

export const getPubliFromCache = ()=>{
  const cachedData = myCache.get(cacheKey);
  return cachedData;
}

export const deleteCache = ()=>{
  myCache.del(cacheKey)
  console.log('Cache foi deletado do servidor')
}

export const savePubliInCache = (dataPubli: any)=>{
  myCache.set(cacheKey, JSON.stringify(dataPubli), 84600)
}