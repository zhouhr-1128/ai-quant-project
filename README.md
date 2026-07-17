# AI Quant Lab - 量化策略作品集

AI 驱动的量化交易策略研究与可视化作品集网站。

## 策略列表

| 策略 | 类型 | 描述 |
|------|------|------|
| [比亚迪决策树交易策略](strategies/byd-decision-tree/index.html) | ML模型 | 基于27个衍生特征的决策树模型，预测未来5日涨跌方向，叠加RSI/均线趋势过滤等风控 |
| [股票分类模型评估面板](strategies/stock-classification/index.html) | ML模型 | 多维度股票分类模型综合评估，含ROC曲线、混淆矩阵、特征重要性等 |
| [比亚迪海龟交易策略](strategies/byd-turtle/index.html) | 量化策略 | 经典海龟交易法则回测，N日高低点突破信号 + ATR动态止损 |
| [海龟策略 N20 vs N55 对比](strategies/byd-turtle-compare/index.html) | 量化策略 | 不同突破周期参数对比分析 |

## 网站结构

```
ai-quant-project/
├── index.html              # 首页（策略导航门户）
├── strategies.json         # 策略元数据配置
├── strategies/             # 各策略看板目录
│   ├── byd-decision-tree/
│   │   └── index.html      # 比亚迪决策树策略看板
│   ├── stock-classification/
│   │   └── index.html      # 股票分类模型评估面板
│   ├── byd-turtle/
│   │   └── index.html      # 海龟策略面板
│   └── byd-turtle-compare/
│       └── index.html      # 海龟策略参数对比
├── assets/
│   ├── css/style.css       # 共享样式
│   └── js/app.js           # 策略渲染逻辑
├── .nojekyll               # 禁用 Jekyll
└── README.md
```

## 如何添加新策略

1. 在 `strategies/` 下创建新目录，放入策略 HTML 看板，命名为 `index.html`
2. 在 `strategies.json` 中添加一条新策略配置：

```json
{
  "id": "your-strategy-id",
  "name": "策略名称",
  "subtitle": "Strategy Name (EN)",
  "category": "ML模型",
  "tags": ["标签1", "标签2"],
  "description": "策略描述...",
  "metrics": {
    "指标1": "值1",
    "指标2": "值2"
  },
  "color": "#667eea",
  "icon": "tree",
  "date": "2026-07",
  "path": "strategies/your-strategy-id/index.html"
}
```

3. 推送到 GitHub，GitHub Pages 自动更新

## 技术栈

- **数据获取**: Tushare API / 西部数据
- **模型**: scikit-learn (Decision Tree, Classification)
- **回测**: 自研 Python 流水线
- **可视化**: Matplotlib + Plotly
- **部署**: GitHub Pages

## 链接

- GitHub: https://github.com/zhouhr-1128/ai-quant-project
- 在线预览: https://zhouhr-1128.github.io/ai-quant-project/
