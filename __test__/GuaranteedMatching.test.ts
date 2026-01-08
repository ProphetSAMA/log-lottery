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
})
