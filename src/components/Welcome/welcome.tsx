import React from 'react'

const Welcome: React.FC = () => {
  return (
    <div>
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: 800,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #00ff88, #00a3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 20px 0',
          letterSpacing: '-2px',
        }}>
        JcyComp
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          color: '#a0a0a0',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
        一个基于React的现代UI组件库，使用TypeScript开发。提供高质量的可定制组件，加速你的Web开发流程。
      </p>

      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto 60px',
          padding: '30px',
          background: 'white',
          borderRadius: '12px',
        }}>
        <h4
          style={{
            marginTop: 0,
          }}>
          🚀 快速开始
        </h4>
        <div
          style={{
            background: 'rgba(240, 240, 240, 0.5)',
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0',
            position: 'relative',
          }}>
          <code
            style={{
              fontSize: '1.1rem',
              color: '#008080',
            }}>
            npm install jcycomp
          </code>
        </div>
        <div
          style={{
            background: 'rgba(240, 240, 240, 0.5)',
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0',
            position: 'relative',
          }}>
          <pre>
            <code
              style={{
                fontSize: '1.1rem',
                color: '#008080',
              }}>
              {`// 加载样式\nimport 'jcycomp/build/index.css'\n// 引入组件\nimport { Button } from 'jcycomp'`}
            </code>
          </pre>
        </div>
      </section>

      <section style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h4>🛠 技术栈</h4>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '30px',
          }}>
          {[
            'React 18',
            'TypeScript 4.9',
            'Storybook 8',
            'SCSS',
            'react-testing-library',
            'ESLint',
          ].map((tech, i) => (
            <div
              key={i}
              style={{
                color: '#a0a0a0',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '1.2rem',
              }}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto 40px',
        }}>
        {[
          { icon: '🎨', title: '丰富组件', desc: '提供多样化的现代UI组件' },
          { icon: '📦', title: 'TypeScript', desc: '完整的类型定义支持' },
          { icon: '⚡️', title: '按需加载', desc: '优化打包体积' },
          { icon: '🔧', title: '主题定制', desc: '灵活的主题配置系统' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '30px',
              transition: 'transform 0.3s',
            }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
              {item.icon}
            </div>
            <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem' }}>
              {item.title}
            </h3>
            <p style={{ color: '#cccccc', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </section>

      <div
        style={{
          textAlign: 'center',
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}>
        <a
          href="https://github.com/tkyjcy/jcycomp"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(45deg, #24292e, #3f4448)',
            color: '#fff',
            padding: '15px 40px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            transition: 'transform 0.3s',
          }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <svg
              height="20"
              viewBox="0 0 16 16"
              width="20"
              fill="currentColor"
              style={{ marginRight: '10px' }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            GitHub 仓库
          </span>
        </a>
      </div>
    </div>
  )
}

export default Welcome
