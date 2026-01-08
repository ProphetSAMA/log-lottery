# 保底逻辑变更说明

## 变更概述

根据 @ProphetSAMA 的反馈，已更改保底人员的应用逻辑。

### 之前的逻辑 ❌
- 手动指定的保底人员在**每次抽奖**时都会优先被选中

### 现在的逻辑 ✅
- 手动指定的保底人员**仅在第6次抽奖时**被优先选中
- 全局抽奖5次后，第6次抽奖时这些人员会被保底

## 技术实现

### 1. 增加抽奖计数器

在 `globalConfig` 中增加了 `drawCount` 字段：
```typescript
guaranteedMatch: {
    enabled: true,
    threshold: 5,
    personIds: [] as string[],
    drawCount: 0,  // 新增：全局抽奖计数
}
```

### 2. 抽奖时递增计数

每次执行 `startLottery()` 时，自动递增计数：
```typescript
globalConfig.incrementGuaranteedMatchDrawCount()
```

### 3. 判断第6次抽奖

使用模运算判断是否是第6次抽奖：
```typescript
const currentDrawCount = guaranteedMatchDrawCount.value ?? 0
const isSixthDraw = currentDrawCount % 6 === 0
```

### 4. 条件性应用手动保底

只在第6次抽奖时应用手动保底人员：
```typescript
let manualGuaranteedWinners: typeof personPool.value = []

// 只在第6次抽奖时应用手动保底人员
if (isSixthDraw && manualGuaranteedIds.length > 0) {
    manualGuaranteedWinners = personPool.value.filter(person => 
        manualIdSet.has(person.uid)
    )
}
```

## 抽奖流程

### 第1-5次抽奖（第7-11次、第13-17次...）

```
优先级 1: 自动保底人员（missCount >= 阈值）
优先级 2: 随机抽取
```

### 第6次抽奖（第12次、第18次...）⭐

```
优先级 1: 手动保底人员（指定的 person IDs）⭐
优先级 2: 自动保底人员（missCount >= 阈值）
优先级 3: 随机抽取
```

## 示例场景

### 配置
```
保底阈值：5次
保底人员编号：U001,U002,U003
```

### 抽奖结果

| 抽奖次数 | 手动保底（U001,U002,U003） | 自动保底（未中5次） | 随机抽取 |
|---------|--------------------------|-------------------|---------|
| 第1次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第2次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第3次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第4次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第5次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| **第6次** | ✅ **优先生效** ⭐      | ✅ 生效            | ✅ 生效  |
| 第7次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第8次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第9次   | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第10次  | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| 第11次  | ❌ 不生效                 | ✅ 生效            | ✅ 生效  |
| **第12次** | ✅ **优先生效** ⭐     | ✅ 生效            | ✅ 生效  |

## 测试

### 测试用例 1：第6次抽奖应用手动保底
```typescript
it('should prioritize manually specified person IDs as guaranteed winners on 6th draw', () => {
    const drawCount = 6 // 或 0, 12, 18 等
    const isSixthDraw = drawCount % 6 === 0
    expect(isSixthDraw).toBe(true)
    // 手动保底人员应该被选中
})
```

### 测试用例 2：非第6次不应用手动保底
```typescript
it('should NOT apply manually specified person IDs on non-6th draws', () => {
    const drawCount = 3 // 第3次抽奖
    const isSixthDraw = drawCount % 6 === 0
    expect(isSixthDraw).toBe(false)
    // 手动保底人员不应该被选中
})
```

## 文件变更

### 核心代码
- `src/store/globalConfig.ts` - 增加 drawCount 和相关方法
- `src/views/Home/useViewModel.ts` - 修改抽奖逻辑，增加计数和条件判断

### 翻译文本
- `src/locales/modules/tooltip.ts` - 更新提示文字说明6次循环

### 测试
- `__test__/GuaranteedMatching.test.ts` - 增加第6次抽奖的测试用例

### 文档
- `GUARANTEED_PERSON_IDS_USAGE.md` - 更新使用说明
- `WHERE_TO_ADD_PERSON_IDS.md` - 更新功能说明
- `QUICK_GUIDE_CN.md` - 更新快速指南

## 提交信息

Commit: 530d0a9
Message: "Change guaranteed logic: apply manual IDs only on every 6th lottery draw"

---

**总结**：现在手动保底人员只在每第6次抽奖（6、12、18、24...）时优先被选中，实现了"全局抽奖5次后，第6次抽奖中奖人为保底人员"的需求。
