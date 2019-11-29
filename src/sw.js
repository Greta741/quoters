self.addEventListener('push', ev => {
    const data = ev.data.json();
    self.registration.showNotification('New quote in board ' + data.boardName, {
        body: data.text + ' - ' + data.author,
    }).catch(error => {
        console.log('error', error);
    });
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://quote-board.site/')
    );
});
