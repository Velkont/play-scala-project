import requests
def test():
    response = requests.post('http://127.0.0.1:9000/phone', json={
                                                    'number':'+7-9123277530',
                                                    'name': 'Vlad'})
    print(response.content)
    response = requests.post('http://127.0.0.1:9000/phone', json={
                                                    'number':'+7-1111111111',
                                                    'name': 'Velkont'})
    response = requests.post('http://127.0.0.1:9000/phone', json={
                                                    'number':'+7-2222222222',
                                                    'name': 'Neon0303'})
    response = requests.post('http://127.0.0.1:9000/phone', json={
                                                    'number':'+7-3333333333',
                                                    'name': 'Ares'})
    response = requests.post('http://127.0.0.1:9000/phone', json={
                                                    'number':'+241-4444444444',
                                                    'name': 'Ares'})
    print(response.content)
    response = requests.get('http://127.0.0.1:9000/phones')
    print(response.content)
    response = requests.post('http://127.0.0.1:9000/phone/3',json={
                                                    'number':'4634677530',
                                                    'name': 'Vlad'})
    print(response.content)
    response = requests.get('http://127.0.0.1:9000/phones')
    print(response.content)
    response = requests.get('http://127.0.0.1:9000/phones/searchByName/?name=Ve')
    print(response.content)

    response = requests.delete('http://127.0.0.1:9000/phone/4')
                               
    print(response.content)
    response = requests.get('http://127.0.0.1:9000/phones')
                               
    print(response.content)
    
test()

