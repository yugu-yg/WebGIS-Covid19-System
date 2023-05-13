import requests
import pprint
import re
import json


def write_to_file(item):
    with open('yiqing.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(item, indent=4, ensure_ascii=False))
        f.close()


reault = requests.get(
    'https://ncov.dxy.cn/ncovh5/view/pneumonia?scene=2&clicktime=1579583352&enterid=1579583352&from=timeline&isappinstalled=0'
)
url_text = reault.content.decode()

url_result = re.search(r'window.getAreaStat = (.*?)}]}catch', url_text, re.S)
texts = url_result.group()

texts = texts.replace('window.getAreaStat = ', '')
texts = texts.replace('}catch', '')
c = json.loads(texts)
# pprint.pprint(c)
write_to_file(c)

result = re.search(r' window.getStatisticsService(.*?)该字段已替换为说明1', url_text,
                   re.S)
result2 = result.group()
result3 = result2.replace(' window.getStatisticsService = ', '') + '"}'
texts4 = json.loads(result3)
currentConfirmedCount = (texts4['currentConfirmedCount'])
suspectedCount = (texts4['suspectedCount'])
seriousCount = (texts4['seriousCount'])
confirmedCount = (texts4['confirmedCount'])
deadCount = (texts4['deadCount'])
curedCount = (texts4['curedCount'])
list_result = []
list_result.append((currentConfirmedCount, suspectedCount, seriousCount,
                    confirmedCount, deadCount, curedCount))
print(list_result)
