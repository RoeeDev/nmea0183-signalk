/**
 * Copyright 2016 Signal K and contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const Parser = require('../lib')
const chai = require('chai')
const should = chai.Should()

chai.Should()
chai.use(require('chai-things'))

describe('XTE', () => {
  it('Converts OK using individual parser', () => {
    const delta = new Parser().parse('$GPXTE,A,A,0.67,L,N*6F')
    // console.log(JSON.stringify(delta, null, 2))

    delta.should.be.an('object')
    delta.updates[0].values[0].path.should.equal(
      'navigation.courseRhumbline.crossTrackError'
    )
    delta.updates[0].values[0].value.should.be.closeTo(1240.84, 0.001)
  })

  it("Doesn't choke on an empty sentence", () => {
    const delta = new Parser().parse('$GPXTE,,,,,*72')
    should.equal(delta, null)
  })
})
