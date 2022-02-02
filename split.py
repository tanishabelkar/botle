f = open('E:\discord-bot\commands\words_list.txt', 'r')
freq = [[] for i in range(0,10)]

def toString(x):
    if x == 3:
        return 'three'
    elif x == 4:
        return 'four'
    elif x == 5:
        return 'five'
    elif x == 6:
        return 'six'
    elif x == 7:
        return 'seven'

for word in f:
    if len(word)>=4 and len(word)<=8:
        freq[len(word)-1].append(word)

for i in range (3,8):
    file = open('E:\discord-bot\commands\words\\'+toString(i)+'.txt', 'w')
    file.write('{\n')
    for word in freq[i]:
        line=(' "{}": 1,\n ').format(word.strip())
        file.write(line)
    file.write('\n}')

