sequenceDiagram
    participant browser
    participant server

    browser --> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server --> browser: "201 created"
    deactivate browser

    Note right of browser: The browser executes JavaScript code to add note to notes.