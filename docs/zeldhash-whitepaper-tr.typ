#set document(
  title: "ZELDHASH Protokolü",
  author: "Ouziel Slama"
)
#set page(
  paper: "a4",
  margin: (x: 2.5cm, y: 2.5cm),
  numbering: "1",
)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")
#show heading: it => [
  #it
  #v(0.8em)
]

#align(center)[
  #text(size: 24pt, weight: "bold")[ZELDHASH PROTOKOLÜ]
]
#align(center)[
  #text(size: 14pt)[*Bitcoin'in En Nadir İşlemlerini Avlayın ve ZELD Kazanın.*]
]
#align(center)[
  #text(size: 12pt)[Yazan: Ouziel Slama]
]

#v(2em)

= Motivasyonlar

- Avın heyecanı için. Her işlem, nadir bir şey keşfetme fırsatına dönüşür — blockchain'de herkesin gözü önünde gizlenmiş dijital bir hazine.

- Bu öncü sıfır kalıpları sadece nadir değil — aynı zamanda sıkıştırmayı geliştirebilir, potansiyel olarak blockchain depolama ve işleme verimliliğini optimize edebilir.

- Herkes nadir işlemleri avlayarak ZELD kazanabilir — Bitcoin blok madenciliğindeki gibi blok başına tek kazanan yok. Av herkese açık.

- Başarılı olursa, ZELD tokenleri sonunda işlem ücretlerini geri ödeyebilir — en nadir bulguları ortaya çıkaran avcıları ödüllendirir!

= ZELD Madenciliği

ZELD madenciliği yapmak için txid'i en az 6 sıfırla başlayan bir Bitcoin işlemi yayınlamalısınız. Ödül, işleminizin bloktaki en iyi işlemle nasıl karşılaştırıldığına göre hesaplanır:

- Belirli bir blokta, en çok sıfırla başlayan işlemler 4096 ZELD kazanır

- En iyi işlemlerden bir sıfır daha az olan işlemler 4096/16 veya 256 ZELD kazanır

- İki sıfır daha az olan işlemler 4096 / 16 / 16 veya 16 ZELD kazanır

- vb.

Bu nedenle kullanılan formül şu şekildedir:

#align(center)[
  ```
  reward = 4096 / 16 ^ (max_zero_count - zero_count)
  ```
]

Burada `max_zero_count` en iyi işlemi başlatan sıfır sayısına eşittir ve `zero_count` ödülünü hesapladığımız işlemi başlatan sıfır sayısıdır.

*Not:* Coinbase işlemleri ZELD ödülleri için uygun değildir.

= ZELD Dağıtımı

6 veya daha fazla sıfırla başlayan bir işlemle kazanılan ZELD'ler UTXO'lara dağıtılır. Dağıtım şu şekilde yapılır:

- Tek bir OP_RETURN olmayan UTXO varsa, tüm ödülü alır.

- İki veya daha fazla OP_RETURN olmayan UTXO varsa, ödül sonuncusu hariç tüm UTXO'lara her UTXO'nun değeriyle orantılı olarak dağıtılır

- Hesaplamalar yalnızca tam sayılarla yapıldığından, bölmenin olası kalanı ilk OP_RETURN olmayan UTXO'ya dağıtılır.

Örneğin, 256 ZELD kazanan bir işlem sırasıyla 500, 500, 500 ve 2000 Satoshi içeren 4 çıktı içeriyorsa, ilk çıktı ödülün 86 ZELD'ini, ikinci ve üçüncüsü 85 ZELD alır.

= ZELD Taşıma

Ekli ZELD'leri olan UTXO'lar harcanırken, ZELD'ler işlemdeki yeni UTXO'lara dağıtılır. ZELD'leri taşırken dağıtmak için iki yöntem vardır:

== Yöntem 1: Otomatik Orantılı Dağıtım

Varsayılan olarak, dağıtım ödüllerle tamamen aynı şekilde yapılır — çıktı UTXO'larının Bitcoin değerlerine göre orantılı olarak, birden fazla çıktı varsa son çıktı hariç tutulur.

== Yöntem 2: OP_RETURN ile Özel Dağıtım

Özel dağıtım verileriyle işleminize bir OP_RETURN çıktısı ekleyerek ZELD'lerin tam olarak nasıl dağıtılması gerektiğini belirtebilirsiniz. Bu, ZELD transferleri üzerinde hassas kontrol sağlar.

=== OP_RETURN Formatı:

- OP_RETURN betiği 4 baytlık "ZELD" önekiyle başlayan veriler içermelidir

- Önekten sonra veriler CBOR formatında kodlanmalıdır

- CBOR verileri işaretsiz 64-bit tam sayı vektörünü (Vec<u64>) temsil etmelidir

- Her tam sayı, ilgili çıktı UTXO'suna kaç ZELD gönderileceğini belirtir

=== Dağıtım Kuralları:

- Dağıtım dizisindeki değer sayısı, OP_RETURN olmayan çıktı sayısıyla eşleşecek şekilde otomatik olarak ayarlanır

- Dizi çok uzunsa, fazla değerler kaldırılır

- Dizi çok kısaysa, sıfırlar eklenir

- Dağıtım değerlerinin toplamı, harcanmakta olan toplam ZELD miktarını aşamaz

- Bu toplam, genel toplamdan azsa, fark ilk çıktıya eklenir

- Bu toplam, genel toplamı aşarsa, işlem orantılı dağıtıma geri döner

- Yeni madencilik yapılan ZELD ödülleri her zaman orantılı olarak dağıtılır ve ardından özel dağıtımla birleştirilir

=== Örnek:

3 çıktıya dağıtmak için 1000 ZELD'iniz varsa ve birincisine 600, ikincisine 300 ve üçüncüsüne 100 göndermek istiyorsanız, OP_RETURN'ünüz "ZELD" ve ardından [600, 300, 100]'ün CBOR kodlamasını içerecektir.

*Notlar:*
- Geçerli bir OP_RETURN dağıtımı bulunamazsa, işlem otomatik olarak orantılı dağıtım yöntemini kullanır.
- Bir işlem yalnızca bir OP_RETURN çıktısı içeriyorsa, işlem girdilerine ekli herhangi bir ZELD #strong[ve yeni kazanılan herhangi bir ödül] kalıcı olarak yakılır çünkü bunları alacak harcanabilir çıktılar yoktur.
- Birden fazla OP_RETURN çıktısı mevcut olduğunda, dağıtım için yalnızca işlemde en son görünen ve geçerli `ZELD`+CBOR yükü taşıyan çıktı dikkate alınır.

