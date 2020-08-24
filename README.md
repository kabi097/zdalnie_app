# Zdalnie.com.pl - Aplikacja frontend
#### Witryna ogłoszeniowa z ofertami pracy zdalnej
Projekt pracy inżynierskiej zrealizowany dla Politechniki Poznańskiej. Celem projektu było zaprojektowanie i implementacja platformy internetowej służącej do publikowania ogłoszeń pracy zdalnej. Aplikację wykonano przy użyciu biblioteki API Platform (Symfony) oraz Vue.js (JavaScript). 

### Demo (video)
<a href="https://vimeo.com/450289918" target="_blank"><img alt="Zobacz film" src="https://i.imgur.com/umqA1VB.png" width="700"></a>
![](https://kabi097.github.io/img/works/zdalnie@2x.jpg)
### Funkcje:
- Wygodna przeglądarka ogłoszeń z obsługą filtrowania i paginacji wyników
- Dodawanie i edycja ogłoszeń dla zalogowanych użytkowników
- Dodawanie i edycja odpowiedzi do ogłoszeń z możliwością zaznaczenia dodatkowych opcji
- Nowoczesny interfejs użytkownika dostosowany do urządzeń mobilnych (Vuetify)
- Strona profil użytkownika z możliwością edycji danych
- Specjalne uprawnienia dla administratora
- Skrypt dodający przykładowe dane do bazy danych

### Repozytoria
Serwer REST API: [github.com/kabi097/zdalnie_api](https://github.com/kabi097/zdalnie_api)

Aplikacja frontend: [github.com/kabi097/zdalnie_app](https://github.com/kabi097/zdalnie_app)

### Instrukcja

1. Zainstaluj serwer REST API korzystając z instrukcji na [tej stronie](https://github.com/kabi097/zdalnie_api/)
2. Ściągnij zawartość repozytorium
``` 
git clone git@github.com:kabi097/zdalnie_app.git 
cd zdalnie_app
``````
3. Zainstaluj zależności
```
npm install
```
3. Skompiluj pliki źródłowe i uruchom serwer deweloperski
```
npm run serve
```
4. Skompiluj pliki źródłowe
```
npm run build
```
