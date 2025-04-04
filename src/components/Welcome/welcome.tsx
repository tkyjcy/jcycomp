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
    </div>
  )
}

export default Welcome
