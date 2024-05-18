
# Fitify Uygulaması

Bu proje, kullanıcıların günlük, haftalık ve aylık adım ve kalori yakma hedeflerini takip etmelerini sağlayan bir React Native uygulamasıdır. Kullanıcılar Firebase ile kayıt olabilir ve kimlik doğrulaması yaparak giriş yapabilirler.

## Özellikler

- Kullanıcı kaydı ve kimlik doğrulama (Firebase ile)
- Kullanıcı hedefleri belirleme: Günlük, haftalık ve aylık adım ve kalori yakma hedefleri belirlenebilir.
- İlerleme güncelleme: Günlük adım ve kalori yakma verileri girilerek hedeflerden düşülür.
- Hedef ve ilerleme takibi: Kullanıcılar hedeflerini ve ilerlemelerini ana menüden görüntüleyebilirler.
- Veriler yerel olarak AsyncStorage ile saklanır.

## Ekran Görüntüleri

![Ekran Görüntüsü 1](1.jpeg)
![Ekran Görüntüsü 2](2.jpeg)
![Ekran Görüntüsü 3](3.jpeg)
![Ekran Görüntüsü 4](4.jpeg)
![Ekran Görüntüsü 5](5.jpeg)




## Kullanım

### Kullanıcı Kaydı ve Giriş

Kullanıcılar uygulamaya ilk girdiklerinde,Adları, soyadları, e-posta adresleri ve şifreleri ile kayıt olabilirler. Kayıt olduktan sonra aynı bilgilerle giriş yapabilirler.

### Ana Menü

Ana menüde, kullanıcı belirlediği hedefleri ve güncel ilerlemelerini görebilir. Üç ana sekme bulunur:
- **Home**: Ana menü
- **Goals**: Hedef belirleme ekranı
- **Profile**: Kullanıcı profili

### Hedef Belirleme

Kullanıcılar `Goals` sekmesine giderek günlük, haftalık ve aylık adım ve kalori yakma hedeflerini belirleyebilirler.

### İlerleme Güncelleme

Kullanıcılar `Progress` ekranında günlük adım ve kalori yakma verilerini girerek ilerlemelerini güncelleyebilirler. Bu veriler, belirlenen hedeflerden düşülerek güncellenir.

## Yapılacaklar

- [ ] Push Bildirimleri eklenmesi
- [ ] Hedeflerin sıfırlanması için bir özellik eklenmesi
- [ ] Kullanıcı kaydı ve kimlik doğrulama ile ilgili gelişmiş özellikler



## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
