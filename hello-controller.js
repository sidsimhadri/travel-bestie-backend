const HelloController = (app) => {
  app.get('/hello', (req, res) => {
    res.send('wawaweeea')
  })
  app.get('/', (req, res) => {
    res.send('TravelBestie Backend!')
  })
}
export default HelloController;