import '../assets/styles/footer.styl'
// import className from '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'itPoet',
      blog: 'itPoet.cn'
    }
  },
  render () {
    return (
    // <div id={className.footer}>
      <div id="footer">
        <span>Power by {this.author}，欢迎访问作者博客：{this.blog}</span>
        <br/>
        <span>Hosted by Coding Pages</span>
      </div>
    )
  }
}