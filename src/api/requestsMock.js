import requestMock from '../utils/requestMock'

// 请求banners
export const reqGetCarouselList = ()=>{
  return requestMock({
    method:'GET',
    url:'/banners'
  })
}

// 请求floor
export const reqGetFloors = ()=>{
  return requestMock({
    method:'GET',
    url:'/floors'
  })
}