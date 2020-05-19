import requests
def test():
    response = requests.post('http://127.0.0.1:9000/phone', json={
                                                    'number':'+7-9123277530',
                                                    'name': 'Vlad'})
    print(response.content)
    response = requests.post('http://127.0.0.1:9000/phone', json={
                                                    'number':'+7912325777530',
                                                    'name': 'Velkont'})
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

