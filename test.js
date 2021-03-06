'use strict';

const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  // テスト用のオブジェクトを用意する
  posts: [{
    id: 1,
    content: '<script>alert(\'test\');</script>',
    postedBy: 'guest1',
    trackingCookie: '4391976947991005_0d6aeb0d6ad6bc82d29857339d6f304b3054dd5b',
    createdAt: new Date(),
    updateAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));
// トラッキングIDのうち表示されるのがIDのみであることをチェック
assert(html.includes('4391976947991005'));
// トラッキングIDからハッシュ値が表示されないことを確認
assert(!html.includes('0d6aeb0d6ad6bc82d29857339d6f304b3054dd5b'));
console.log('テストが正常に完了しました');