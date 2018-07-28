import '../assets/styles/footer.styl'
// import className from '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'LingWuYa',
      blog: 'www.lingwuya.com'
    }
  },
  render () {
    return (
    // <div id={className.footer}>
      <div id="footer">
        <span>Power by {this.author}，欢迎访问我的博客：{this.blog}</span>
        <br/>
        <span class="slogen">“吾生也有涯,而知也无涯。”</span>
      </div>
    )
  }
}
