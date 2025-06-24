import { expect, test } from 'vitest'
import {sum} from '../components/sum.jsx'
import { describe, it, render } from 'vitest'

test('adds 1 + 2 to equal 3', ()=>{
    expect(sum(1, 2)).toBe(3)
})

describe('suite', ()=>{
    it('serial test', async ()=> { });
    it.concurrent('concurrent test 1', async ({ expect }) => { });
    it.concurrent('concurrent test 2', async ({ expect }) => { });
})

describe.concurrent("suite", ()=>{
    it('test 1', async ({ expect })=> {}) 
    it('test 2', async ({ expect })=> {}) 
    it('test 3', async ({ expect })=> {}) 
})

