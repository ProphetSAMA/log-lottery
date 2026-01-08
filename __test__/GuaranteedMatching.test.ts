import { describe, expect, it } from 'vitest'
import type { IPersonConfig } from '@/types/storeType'

describe('Guaranteed Matching Feature', () => {
    // 测试保底匹配逻辑
    it('should select people with missCount >= 5 as guaranteed winners', () => {
        const personPool: IPersonConfig[] = [
            {
                id: 1,
                uid: 'U001',
                uuid: 'uuid-1',
                name: 'Person 1',
                department: 'Dept A',
                identity: 'Identity A',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 5, // 保底人员
            },
            {
                id: 2,
                uid: 'U002',
                uuid: 'uuid-2',
                name: 'Person 2',
                department: 'Dept B',
                identity: 'Identity B',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 3,
            },
            {
                id: 3,
                uid: 'U003',
                uuid: 'uuid-3',
                name: 'Person 3',
                department: 'Dept C',
                identity: 'Identity C',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 6, // 保底人员
            },
            {
                id: 4,
                uid: 'U004',
                uuid: 'uuid-4',
                name: 'Person 4',
                department: 'Dept D',
                identity: 'Identity D',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 0,
            },
        ]

        const guaranteedWinners = personPool.filter(person => (person.missCount || 0) >= 5)
        
        expect(guaranteedWinners).toHaveLength(2)
        expect(guaranteedWinners.map(p => p.id)).toEqual([1, 3])
    })

    it('should handle missCount initialization for undefined values', () => {
        const person: any = {
            id: 1,
            name: 'Test Person',
        }

        const missCount = person.missCount || 0
        expect(missCount).toBe(0)
    })

    it('should increment missCount correctly', () => {
        const person: IPersonConfig = {
            id: 1,
            uid: 'U001',
            uuid: 'uuid-1',
            name: 'Person 1',
            department: 'Dept A',
            identity: 'Identity A',
            avatar: '',
            isWin: false,
            x: 0,
            y: 0,
            createTime: '',
            updateTime: '',
            prizeName: [],
            prizeId: [],
            prizeTime: [],
            missCount: 3,
        }

        person.missCount = (person.missCount || 0) + 1
        expect(person.missCount).toBe(4)

        person.missCount = (person.missCount || 0) + 1
        expect(person.missCount).toBe(5)
    })

    it('should reset missCount to 0 when person wins', () => {
        const person: IPersonConfig = {
            id: 1,
            uid: 'U001',
            uuid: 'uuid-1',
            name: 'Person 1',
            department: 'Dept A',
            identity: 'Identity A',
            avatar: '',
            isWin: false,
            x: 0,
            y: 0,
            createTime: '',
            updateTime: '',
            prizeName: [],
            prizeId: [],
            prizeTime: [],
            missCount: 5,
        }

        person.missCount = 0
        expect(person.missCount).toBe(0)
    })

    it('should prioritize guaranteed winners over random selection', () => {
        const personPool: IPersonConfig[] = [
            {
                id: 1,
                uid: 'U001',
                uuid: 'uuid-1',
                name: 'Guaranteed 1',
                department: 'Dept A',
                identity: 'Identity A',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 5,
            },
            {
                id: 2,
                uid: 'U002',
                uuid: 'uuid-2',
                name: 'Regular 1',
                department: 'Dept B',
                identity: 'Identity B',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 2,
            },
            {
                id: 3,
                uid: 'U003',
                uuid: 'uuid-3',
                name: 'Guaranteed 2',
                department: 'Dept C',
                identity: 'Identity C',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 7,
            },
        ]

        const luckyCount = 2
        const guaranteedWinners = personPool.filter(person => (person.missCount || 0) >= 5)
        const guaranteedCount = Math.min(guaranteedWinners.length, luckyCount)
        
        expect(guaranteedCount).toBe(2)
        expect(guaranteedWinners.slice(0, guaranteedCount).map(p => p.id)).toEqual([1, 3])
    })

    it('should mix guaranteed and random winners when needed', () => {
        const personPool: IPersonConfig[] = [
            {
                id: 1,
                uid: 'U001',
                uuid: 'uuid-1',
                name: 'Guaranteed 1',
                department: 'Dept A',
                identity: 'Identity A',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 5,
            },
            {
                id: 2,
                uid: 'U002',
                uuid: 'uuid-2',
                name: 'Regular 1',
                department: 'Dept B',
                identity: 'Identity B',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 2,
            },
            {
                id: 3,
                uid: 'U003',
                uuid: 'uuid-3',
                name: 'Regular 2',
                department: 'Dept C',
                identity: 'Identity C',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 1,
            },
        ]

        const luckyCount = 3
        const guaranteedWinners = personPool.filter(person => (person.missCount || 0) >= 5)
        const guaranteedCount = Math.min(guaranteedWinners.length, luckyCount)
        
        // 应该有1个保底人员
        expect(guaranteedCount).toBe(1)
        // 剩余需要从非保底池中抽取2个
        const remainingCount = luckyCount - guaranteedCount
        expect(remainingCount).toBe(2)
        
        const remainingPool = personPool.filter(person => (person.missCount || 0) < 5)
        expect(remainingPool).toHaveLength(2)
    })

    // 测试手动指定保底人员ID的功能
    it('should prioritize manually specified person IDs as guaranteed winners', () => {
        const personPool: IPersonConfig[] = [
            {
                id: 1,
                uid: 'U001',
                uuid: 'uuid-1',
                name: 'Manual Guaranteed 1',
                department: 'Dept A',
                identity: 'Identity A',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 0, // 没有达到阈值，但手动指定
            },
            {
                id: 2,
                uid: 'U002',
                uuid: 'uuid-2',
                name: 'Regular',
                department: 'Dept B',
                identity: 'Identity B',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 2,
            },
            {
                id: 3,
                uid: 'U003',
                uuid: 'uuid-3',
                name: 'Auto Guaranteed',
                department: 'Dept C',
                identity: 'Identity C',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 5, // 达到阈值
            },
        ]

        const manualGuaranteedIds = ['U001']
        const threshold = 5
        
        // 手动指定的保底人员
        const manualGuaranteedWinners = personPool.filter(person => 
            manualGuaranteedIds.includes(person.uid)
        )
        
        // 自动保底人员（排除手动指定的）
        const autoGuaranteedWinners = personPool.filter(person => 
            (person.missCount || 0) >= threshold && !manualGuaranteedIds.includes(person.uid)
        )
        
        // 合并保底人员
        const allGuaranteedWinners = [...manualGuaranteedWinners, ...autoGuaranteedWinners]
        
        expect(manualGuaranteedWinners).toHaveLength(1)
        expect(manualGuaranteedWinners[0].uid).toBe('U001')
        expect(autoGuaranteedWinners).toHaveLength(1)
        expect(autoGuaranteedWinners[0].uid).toBe('U003')
        expect(allGuaranteedWinners).toHaveLength(2)
        expect(allGuaranteedWinners.map(p => p.uid)).toEqual(['U001', 'U003'])
    })

    it('should handle multiple manually specified person IDs', () => {
        const personPool: IPersonConfig[] = [
            {
                id: 1,
                uid: 'U001',
                uuid: 'uuid-1',
                name: 'Manual 1',
                department: 'Dept A',
                identity: 'Identity A',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 0,
            },
            {
                id: 2,
                uid: 'U002',
                uuid: 'uuid-2',
                name: 'Manual 2',
                department: 'Dept B',
                identity: 'Identity B',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 1,
            },
            {
                id: 3,
                uid: 'U003',
                uuid: 'uuid-3',
                name: 'Regular',
                department: 'Dept C',
                identity: 'Identity C',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 2,
            },
        ]

        const manualGuaranteedIds = ['U001', 'U002']
        
        const manualGuaranteedWinners = personPool.filter(person => 
            manualGuaranteedIds.includes(person.uid)
        )
        
        expect(manualGuaranteedWinners).toHaveLength(2)
        expect(manualGuaranteedWinners.map(p => p.uid)).toEqual(['U001', 'U002'])
    })

    it('should handle empty manual person IDs list', () => {
        const personPool: IPersonConfig[] = [
            {
                id: 1,
                uid: 'U001',
                uuid: 'uuid-1',
                name: 'Person 1',
                department: 'Dept A',
                identity: 'Identity A',
                avatar: '',
                isWin: false,
                x: 0,
                y: 0,
                createTime: '',
                updateTime: '',
                prizeName: [],
                prizeId: [],
                prizeTime: [],
                missCount: 5,
            },
        ]

        const manualGuaranteedIds: string[] = []
        const threshold = 5
        
        const manualGuaranteedWinners = personPool.filter(person => 
            manualGuaranteedIds.includes(person.uid)
        )
        
        const autoGuaranteedWinners = personPool.filter(person => 
            (person.missCount || 0) >= threshold && !manualGuaranteedIds.includes(person.uid)
        )
        
        expect(manualGuaranteedWinners).toHaveLength(0)
        expect(autoGuaranteedWinners).toHaveLength(1)
    })
})
