
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/custom/typo/H2'
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { H4 } from '@/components/custom/typo/H4'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Small } from '@/components/custom/typo/Small'

export function ManualAnalysis({ toogleIaModal, patient, analysis }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [viewType, setViewType] = useState('raiox')
  const [selecionados, setSelecionados] = useState({})

  const partes = ['radio', 'ulna']
  const letras = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
  const tipos = ['TW2', 'RUS']
  const [ages, setAges] = useState()

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isDisabledConfirmModal, setIsDisabledConfirmModal] = useState(true)

  const agesTable = {
    'meninos': {
      'table A1': {
        '26': 1.6,
        '32': 1.7,
        '38': 1.8,
        '43': 1.9,
        '49': 2,
        '55': 2.1,
        '61': 2.2,
        '65': 2.3,
        '70': 2.4,
        '75': 2.5,
        '80': 2.6,
        '84': 2.7,
        '89': 2.8,
        '93': 2.9,
        '98': 3,
        '101': 3.1,
        '105': 3.2,
        '108': 3.3,
        '112': 3.4,
        '115': 3.5,
        '118': 3.6,
        '122': 3.7,
        '125': 3.8,
        '128': 3.9,
        '132': 4,
        '135': 4.1,
        '138': 4.2,
        '141': 4.3,
        '144': 4.4,
        '147': 4.5,
        '150': 4.6,
        '153': 4.7,
        '156': 4.8,
        '159': 4.9,
        '162': 5,
        '165': 5.1,
        '168': 5.2,
        '171': 5.3,
        '173': 5.4,
        '177': 5.5,
        '180': 5.6,
        '182': 5.7,
        '185': 5.8,
        '187': 5.9,

        '189': 6,
        '192': 6.1,
        '194': 6.2,
        '197': 6.3,
        '199': 6.4,
        '202': 6.5,
        '204': 6.6,
        '207': 6.7,
        '209': 6.8,
        '212': 6.9,
        '215': 7,
        '218': 7.1,
        '222': 7.2,
        '224': 7.3,
        '227': 7.4,
        '230': 7.5,
        '233': 7.6,
        '235': 7.7,
        '238': 7.8,
        '240': 7.9,
        '243': 8,
        '245': 8.1,
        '248': 8.2,
        '251': 8.3,
        '253': 8.4,
        '257': 8.5,
        '260': 8.6,
        '263': 8.7,
        '266': 8.8,
        '269': 8.9,
        '272': 9,
        '275': 9.1,
        '278': 9.2,
        '281': 9.3,
        '283': 9.4,
        '286': 9.5,
        '289': 9.6,
        '292': 9.7,
        '295': 9.8,
        '297': 9.9,
        '300': 10,
        '303': 10.1,
        '306': 10.2,
        '309': 10.3,
        '312': 10.4,
        '316': 10.5,
        '319': 10.6,
        '321': 10.7,
        '325': 10.8,
        '328': 10.9,

        '330': 11,
        '334': 11.1,
        '337': 11.2,
        '340': 11.3,
        '342': 11.4,
        '346': 11.5,
        '349': 11.6,
        '352': 11.7,
        '354': 11.8,
        '358': 11.9,
        '361': 12,
        '365': 12.1,
        '369': 12.2,
        '373': 12.3,
        '378': 12.4,
        '382': 12.5,
        '386': 12.6,
        '391': 12.7,
        '395': 12.8,
        '400': 12.9,
        '405': 13,
        '410': 13.1,
        '416': 13.2,
        '422': 13.3,
        '427': 13.4,
        '434': 13.5,
        '440': 13.6,
        '447': 13.7,
        '454': 13.8,
        '463': 13.9,
        '472': 14,
        '481': 14.1,
        '490': 14.2,
        '501': 14.3,
        '512': 14.4,
        '524': 14.5,
        '536': 14.6,
        '548': 14.7,
        '560': 14.8,
        '574': 14.9,
        '588': 15,
        '602': 15.1,
        '616': 15.2,
        '630': 15.3,
        '645': 15.4,
        '660': 15.5,
        '675': 15.6,
        '692': 15.7,
        '708': 15.8,
        '726': 15.9,

        '744': 16,
        '762': 16.1,
        '780': 16.2,
        '798': 16.3,
        '816': 16.4,
        '833': 16.5,
        '850': 16.6,
        '867': 16.7,
        '883': 16.8,
        '899': 16.9,
        '915': 17,
        '928': 17.1,
        '940': 17.2,
        '951': 17.3,
        '962': 17.4,
        '971': 17.5,
        '980': 17.6,
        '986': 17.7,
        '992': 17.8,
        '995': 17.9,
        '997': 18,
        '999': 18.1,
        '1000': -1

      }
    }
  }

  const values = {
    radio: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 15, RUS: 16 }, Feminino: { TW2: 17, RUS: 23 } },
      'C': { Masculino: { TW2: 17, RUS: 21 }, Feminino: { TW2: 19, RUS: 30 } },
      'D': { Masculino: { TW2: 21, RUS: 30 }, Feminino: { TW2: 25, RUS: 44 } },
      'E': { Masculino: { TW2: 27, RUS: 39 }, Feminino: { TW2: 33, RUS: 56 } },
      'F': { Masculino: { TW2: 48, RUS: 59 }, Feminino: { TW2: 54, RUS: 78 } },
      'G': { Masculino: { TW2: 77, RUS: 87 }, Feminino: { TW2: 85, RUS: 114 } },
      'H': { Masculino: { TW2: 96, RUS: 138 }, Feminino: { TW2: 99, RUS: 160 } },
      'I': { Masculino: { TW2: 106, RUS: 213 }, Feminino: { TW2: 106, RUS: 218 } }
    },
    ulna: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 22, RUS: 27 }, Feminino: { TW2: 22, RUS: 30 } },
      'C': { Masculino: { TW2: 26, RUS: 30 }, Feminino: { TW2: 26, RUS: 33 } },
      'D': { Masculino: { TW2: 30, RUS: 32 }, Feminino: { TW2: 30, RUS: 37 } },
      'E': { Masculino: { TW2: 39, RUS: 40 }, Feminino: { TW2: 39, RUS: 45 } },
      'F': { Masculino: { TW2: 56, RUS: 58 }, Feminino: { TW2: 60, RUS: 74 } },
      'G': { Masculino: { TW2: 73, RUS: 107 }, Feminino: { TW2: 73, RUS: 118 } },
      'H': { Masculino: { TW2: 84, RUS: 181 }, Feminino: { TW2: 80, RUS: 173 } },
    },
    primeiroMetacarpal: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 4, RUS: 6 }, Feminino: { TW2: 5, RUS: 8 } },
      'C': { Masculino: { TW2: 5, RUS: 9 }, Feminino: { TW2: 6, RUS: 12 } },
      'D': { Masculino: { TW2: 11, RUS: 14 }, Feminino: { TW2: 11, RUS: 18 } },
      'E': { Masculino: { TW2: 19, RUS: 21 }, Feminino: { TW2: 18, RUS: 24 } },
      'F': { Masculino: { TW2: 24, RUS: 26 }, Feminino: { TW2: 24, RUS: 31 } },
      'G': { Masculino: { TW2: 28, RUS: 36 }, Feminino: { TW2: 29, RUS: 43 } },
      'H': { Masculino: { TW2: 30, RUS: 49 }, Feminino: { TW2: 31, RUS: 53 } },
      'I': { Masculino: { TW2: 32, RUS: 67 }, Feminino: { TW2: 33, RUS: 67 } }
    },
    terceiroEquintoMetacarpal: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 3, RUS: 4 }, Feminino: { TW2: 3, RUS: 5 } },
      'C': { Masculino: { TW2: 4, RUS: 5 }, Feminino: { TW2: 5, RUS: 8 } },
      'D': { Masculino: { TW2: 6, RUS: 9 }, Feminino: { TW2: 7, RUS: 12 } },
      'E': { Masculino: { TW2: 10, RUS: 12 }, Feminino: { TW2: 11, RUS: 16 } },
      'F': { Masculino: { TW2: 16, RUS: 19 }, Feminino: { TW2: 17, RUS: 23 } },
      'G': { Masculino: { TW2: 22, RUS: 31 }, Feminino: { TW2: 23, RUS: 37 } },
      'H': { Masculino: { TW2: 23, RUS: 43 }, Feminino: { TW2: 24, RUS: 47 } },
      'I': { Masculino: { TW2: 25, RUS: 52 }, Feminino: { TW2: 26, RUS: 53 } }
    },
    falangeProximalDoPolegar: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 4, RUS: 7 }, Feminino: { TW2: 5, RUS: 9 } },
      'C': { Masculino: { TW2: 5, RUS: 8 }, Feminino: { TW2: 5, RUS: 11 } },
      'D': { Masculino: { TW2: 8, RUS: 11 }, Feminino: { TW2: 8, RUS: 14 } },
      'E': { Masculino: { TW2: 15, RUS: 17 }, Feminino: { TW2: 14, RUS: 20 } },
      'F': { Masculino: { TW2: 23, RUS: 26 }, Feminino: { TW2: 24, RUS: 31 } },
      'G': { Masculino: { TW2: 28, RUS: 38 }, Feminino: { TW2: 29, RUS: 44 } },
      'H': { Masculino: { TW2: 30, RUS: 52 }, Feminino: { TW2: 30, RUS: 56 } },
      'I': { Masculino: { TW2: 32, RUS: 67 }, Feminino: { TW2: 32, RUS: 67 } }
    },
    falangesProximaisDoTerceiroEquintoDedo: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 3, RUS: 4 }, Feminino: { TW2: 4, RUS: 5 } },
      'C': { Masculino: { TW2: 4, RUS: 4 }, Feminino: { TW2: 4, RUS: 7 } },
      'D': { Masculino: { TW2: 6, RUS: 9 }, Feminino: { TW2: 7, RUS: 12 } },
      'E': { Masculino: { TW2: 13, RUS: 15 }, Feminino: { TW2: 13, RUS: 19 } },
      'F': { Masculino: { TW2: 20, RUS: 23 }, Feminino: { TW2: 20, RUS: 27 } },
      'G': { Masculino: { TW2: 23, RUS: 31 }, Feminino: { TW2: 24, RUS: 37 } },
      'H': { Masculino: { TW2: 24, RUS: 40 }, Feminino: { TW2: 25, RUS: 44 } },
      'I': { Masculino: { TW2: 26, RUS: 53 }, Feminino: { TW2: 26, RUS: 54 } }
    },
    falangesMediasDoTerceiroEquintoDedo: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 3, RUS: 4 }, Feminino: { TW2: 4, RUS: 6 } },
      'C': { Masculino: { TW2: 4, RUS: 6 }, Feminino: { TW2: 4, RUS: 8 } },
      'D': { Masculino: { TW2: 7, RUS: 9 }, Feminino: { TW2: 7, RUS: 12 } },
      'E': { Masculino: { TW2: 13, RUS: 15 }, Feminino: { TW2: 13, RUS: 18 } },
      'F': { Masculino: { TW2: 19, RUS: 22 }, Feminino: { TW2: 20, RUS: 27 } },
      'G': { Masculino: { TW2: 22, RUS: 32 }, Feminino: { TW2: 23, RUS: 36 } },
      'H': { Masculino: { TW2: 23, RUS: 43 }, Feminino: { TW2: 24, RUS: 45 } },
      'I': { Masculino: { TW2: 25, RUS: 52 }, Feminino: { TW2: 25, RUS: 52 } }
    },
    falangeDistalDoPolegar: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 4, RUS: 5 }, Feminino: { TW2: 5, RUS: 7 } },
      'C': { Masculino: { TW2: 4, RUS: 6 }, Feminino: { TW2: 5, RUS: 9 } },
      'D': { Masculino: { TW2: 7, RUS: 11 }, Feminino: { TW2: 8, RUS: 15 } },
      'E': { Masculino: { TW2: 14, RUS: 17 }, Feminino: { TW2: 15, RUS: 22 } },
      'F': { Masculino: { TW2: 23, RUS: 26 }, Feminino: { TW2: 24, RUS: 33 } },
      'G': { Masculino: { TW2: 30, RUS: 38 }, Feminino: { TW2: 31, RUS: 48 } },
      'H': { Masculino: { TW2: 31, RUS: 46 }, Feminino: { TW2: 32, RUS: 51 } },
      'I': { Masculino: { TW2: 33, RUS: 66 }, Feminino: { TW2: 34, RUS: 68 } }
    },
    falangesDistalDoTerceiroEquintoDedo: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 3, RUS: 4 }, Feminino: { TW2: 3, RUS: 7 } },
      'C': { Masculino: { TW2: 4, RUS: 6 }, Feminino: { TW2: 4, RUS: 8 } },
      'D': { Masculino: { TW2: 6, RUS: 8 }, Feminino: { TW2: 6, RUS: 11 } },
      'E': { Masculino: { TW2: 10, RUS: 13 }, Feminino: { TW2: 10, RUS: 15 } },
      'F': { Masculino: { TW2: 16, RUS: 18 }, Feminino: { TW2: 17, RUS: 22 } },
      'G': { Masculino: { TW2: 21, RUS: 28 }, Feminino: { TW2: 22, RUS: 33 } },
      'H': { Masculino: { TW2: 22, RUS: 34 }, Feminino: { TW2: 23, RUS: 37 } },
      'I': { Masculino: { TW2: 24, RUS: 49 }, Feminino: { TW2: 24, RUS: 49 } }
    },
    capitato: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 60, RUS: 100 }, Feminino: { TW2: 53, RUS: 84 } },
      'C': { Masculino: { TW2: 62, RUS: 104 }, Feminino: { TW2: 56, RUS: 88 } },
      'D': { Masculino: { TW2: 65, RUS: 106 }, Feminino: { TW2: 61, RUS: 91 } },
      'E': { Masculino: { TW2: 71, RUS: 113 }, Feminino: { TW2: 67, RUS: 99 } },
      'F': { Masculino: { TW2: 79, RUS: 133 }, Feminino: { TW2: 76, RUS: 121 } },
      'G': { Masculino: { TW2: 89, RUS: 160 }, Feminino: { TW2: 85, RUS: 149 } },
      'H': { Masculino: { TW2: 116, RUS: 214 }, Feminino: { TW2: 113, RUS: 203 } }
    },
    hamato: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 42, RUS: 73 }, Feminino: { TW2: 44, RUS: 72 } },
      'C': { Masculino: { TW2: 44, RUS: 75 }, Feminino: { TW2: 47, RUS: 74 } },
      'D': { Masculino: { TW2: 49, RUS: 79 }, Feminino: { TW2: 53, RUS: 78 } },
      'E': { Masculino: { TW2: 59, RUS: 100 }, Feminino: { TW2: 64, RUS: 102 } },
      'F': { Masculino: { TW2: 70, RUS: 128 }, Feminino: { TW2: 74, RUS: 131 } },
      'G': { Masculino: { TW2: 81, RUS: 159 }, Feminino: { TW2: 85, RUS: 161 } },
      'H': { Masculino: { TW2: 92, RUS: 181 }, Feminino: { TW2: 97, RUS: 183 } },
      'I': { Masculino: { TW2: 106, RUS: 194 }, Feminino: { TW2: 109, RUS: 194 } }
    },
    piramidal: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 7, RUS: 10 }, Feminino: { TW2: 8, RUS: 11 } },
      'C': { Masculino: { TW2: 10, RUS: 13 }, Feminino: { TW2: 12, RUS: 16 } },
      'D': { Masculino: { TW2: 17, RUS: 28 }, Feminino: { TW2: 19, RUS: 31 } },
      'E': { Masculino: { TW2: 28, RUS: 57 }, Feminino: { TW2: 28, RUS: 56 } },
      'F': { Masculino: { TW2: 38, RUS: 84 }, Feminino: { TW2: 36, RUS: 80 } },
      'G': { Masculino: { TW2: 45, RUS: 102 }, Feminino: { TW2: 46, RUS: 104 } },
      'H': { Masculino: { TW2: 62, RUS: 124 }, Feminino: { TW2: 63, RUS: 126 } }
    },
    semilunar: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 10, RUS: 14 }, Feminino: { TW2: 10, RUS: 16 } },
      'C': { Masculino: { TW2: 13, RUS: 22 }, Feminino: { TW2: 14, RUS: 24 } },
      'D': { Masculino: { TW2: 20, RUS: 39 }, Feminino: { TW2: 20, RUS: 40 } },
      'E': { Masculino: { TW2: 27, RUS: 58 }, Feminino: { TW2: 27, RUS: 59 } },
      'F': { Masculino: { TW2: 36, RUS: 84 }, Feminino: { TW2: 35, RUS: 84 } },
      'G': { Masculino: { TW2: 44, RUS: 101 }, Feminino: { TW2: 46, RUS: 106 } },
      'H': { Masculino: { TW2: 60, RUS: 120 }, Feminino: { TW2: 60, RUS: 122 } }
    },
    escafoide: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 14, RUS: 26 }, Feminino: { TW2: 13, RUS: 24 } },
      'C': { Masculino: { TW2: 18, RUS: 36 }, Feminino: { TW2: 17, RUS: 35 } },
      'D': { Masculino: { TW2: 23, RUS: 52 }, Feminino: { TW2: 23, RUS: 51 } },
      'E': { Masculino: { TW2: 30, RUS: 71 }, Feminino: { TW2: 29, RUS: 71 } },
      'F': { Masculino: { TW2: 35, RUS: 85 }, Feminino: { TW2: 36, RUS: 88 } },
      'G': { Masculino: { TW2: 42, RUS: 100 }, Feminino: { TW2: 44, RUS: 104 } },
      'H': { Masculino: { TW2: 58, RUS: 116 }, Feminino: { TW2: 57, RUS: 118 } }
    },
    trapezio: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 12, RUS: 23 }, Feminino: { TW2: 12, RUS: 20 } },
      'C': { Masculino: { TW2: 15, RUS: 31 }, Feminino: { TW2: 14, RUS: 27 } },
      'D': { Masculino: { TW2: 21, RUS: 46 }, Feminino: { TW2: 20, RUS: 42 } },
      'E': { Masculino: { TW2: 28, RUS: 66 }, Feminino: { TW2: 25, RUS: 60 } },
      'F': { Masculino: { TW2: 34, RUS: 83 }, Feminino: { TW2: 32, RUS: 80 } },
      'G': { Masculino: { TW2: 39, RUS: 95 }, Feminino: { TW2: 39, RUS: 95 } },
      'H': { Masculino: { TW2: 47, RUS: 108 }, Feminino: { TW2: 49, RUS: 111 } },
      'I': { Masculino: { TW2: 59, RUS: 117 }, Feminino: { TW2: 59, RUS: 119 } }
    },
    trapezoide: {
      'A': { Masculino: { TW2: 0, RUS: 0 }, Feminino: { TW2: 0, RUS: 0 } },
      'B': { Masculino: { TW2: 14, RUS: 27 }, Feminino: { TW2: 13, RUS: 21 } },
      'C': { Masculino: { TW2: 16, RUS: 32 }, Feminino: { TW2: 16, RUS: 30 } },
      'D': { Masculino: { TW2: 20, RUS: 42 }, Feminino: { TW2: 20, RUS: 43 } },
      'E': { Masculino: { TW2: 23, RUS: 51 }, Feminino: { TW2: 24, RUS: 53 } },
      'F': { Masculino: { TW2: 32, RUS: 77 }, Feminino: { TW2: 31, RUS: 77 } },
      'G': { Masculino: { TW2: 39, RUS: 93 }, Feminino: { TW2: 40, RUS: 97 } },
      'H': { Masculino: { TW2: 56, RUS: 115 }, Feminino: { TW2: 57, RUS: 118 } }
    },

  }

  const steps = [
    {
      name: 'Etapa 1',
      parte: 'radio',
      descricao: 'Selecione o Rádio correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/radio/Radio-B.png' },
        { nome: 'C', caminho: '/xray/radio/Radio-C.png' },
        { nome: 'D', caminho: '/xray/radio/Radio-D.png' },
        { nome: 'E', caminho: '/xray/radio/Radio-E.png' },
        { nome: 'F', caminho: '/xray/radio/Radio-F.png' },
        { nome: 'G', caminho: '/xray/radio/Radio-G.png' },
        { nome: 'H', caminho: '/xray/radio/Radio-H.png' },
        { nome: 'I', caminho: '/xray/radio/Radio-I.png' }
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/radio/Radio-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/radio/Radio-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/radio/Radio-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/radio/Radio-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/radio/Radio-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/radio/Radio-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/radio/Radio-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/radio/Radio-I-Desenho.png' }
      ],
    },
    {
      name: 'Etapa 2',
      parte: 'ulna',
      descricao: 'Selecione o Ulna correspondente',
      imagensRaiox: [

        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/ulna/ulna-B.png' },
        { nome: 'C', caminho: '/xray/ulna/ulna-C.png' },
        { nome: 'D', caminho: '/xray/ulna/ulna-D.png' },
        { nome: 'E', caminho: '/xray/ulna/ulna-E.png' },
        { nome: 'F', caminho: '/xray/ulna/ulna-F.png' },
        { nome: 'G', caminho: '/xray/ulna/ulna-G.png' },
        { nome: 'H', caminho: '/xray/ulna/ulna-H.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/ulna/ulna-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/ulna/ulna-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/ulna/ulna-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/ulna/ulna-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/ulna/ulna-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/ulna/ulna-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/ulna/ulna-H-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 3',
      parte: 'primeiroMetacarpal',
      descricao: 'Selecione o Primeiro Metacarpal correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-B.png' },
        { nome: 'C', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-C.png' },
        { nome: 'D', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-D.png' },
        { nome: 'E', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-E.png' },
        { nome: 'F', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-F.png' },
        { nome: 'G', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-G.png' },
        { nome: 'H', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-H.png' },
        { nome: 'I', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/primeiroMetacarpal/primeiroMetacarpal-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 4',
      parte: 'terceiroEquintoMetacarpal',
      descricao: 'Selecione o Terceiro e Quinto Metacarpal correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-B.png' },
        { nome: 'C', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-C.png' },
        { nome: 'D', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-D.png' },
        { nome: 'E', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-E.png' },
        { nome: 'F', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-F.png' },
        { nome: 'G', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-G.png' },
        { nome: 'H', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-H.png' },
        { nome: 'I', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/terceiroEquintoMetacarpal/terceiroEquintoMetacarpal-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 5',
      parte: 'falangeProximalDoPolegar',
      descricao: 'Selecione o Falange Proximal do Polegar correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-B.png' },
        { nome: 'C', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-C.png' },
        { nome: 'D', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-D.png' },
        { nome: 'E', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-E.png' },
        { nome: 'F', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-F.png' },
        { nome: 'G', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-G.png' },
        { nome: 'H', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-H.png' },
        { nome: 'I', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/falangeProximalDoPolegar/falangeProximalDoPolegar-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 6',
      parte: 'falangesProximaisDoTerceiroEquintoDedo',
      descricao: 'Selecione o Falange Proximal do Terceiro e Quinto Dedo correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-B.png' },
        { nome: 'C', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-C.png' },
        { nome: 'D', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-D.png' },
        { nome: 'E', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-E.png' },
        { nome: 'F', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-F.png' },
        { nome: 'G', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-G.png' },
        { nome: 'H', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-H.png' },
        { nome: 'I', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/falangesProximaisDoTerceiroEquintoDedo/falangesProximaisDoTerceiroEquintoDedo-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 7',
      parte: 'falangesMediasDoTerceiroEquintoDedo',
      descricao: 'Selecione o Falange Medianos do Terceiro e Quinto Dedo correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-B.png' },
        { nome: 'C', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-C.png' },
        { nome: 'D', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-D.png' },
        { nome: 'E', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-E.png' },
        { nome: 'F', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-F.png' },
        { nome: 'G', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-G.png' },
        { nome: 'H', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-H.png' },
        { nome: 'I', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/falangesMediasDoTerceiroEquintoDedo/falangesMediasDoTerceiroEquintoDedo-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 8',
      parte: 'falangeDistalDoPolegar',
      descricao: 'Selecione o Falange Distal do Polegar correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-B.png' },
        { nome: 'C', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-C.png' },
        { nome: 'D', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-D.png' },
        { nome: 'E', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-E.png' },
        { nome: 'F', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-F.png' },
        { nome: 'G', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-G.png' },
        { nome: 'H', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-H.png' },
        { nome: 'I', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/falangeDistalDoPolegar/falangeDistalDoPolegar-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 9',
      parte: 'falangesDistalDoTerceiroEquintoDedo',
      descricao: 'Selecione o Falange Distal do Terceiro e Quinto Dedo correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-B.png' },
        { nome: 'C', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-C.png' },
        { nome: 'D', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-D.png' },
        { nome: 'E', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-E.png' },
        { nome: 'F', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-F.png' },
        { nome: 'G', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-G.png' },
        { nome: 'H', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-H.png' },
        { nome: 'I', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/falangesDistalDoTerceiroEquintoDedo/falangesDistalDoTerceiroEquintoDedo-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 10',
      parte: 'capitato',
      descricao: 'Selecione o Capitato correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/capitato/capitato-B.png' },
        { nome: 'C', caminho: '/xray/capitato/capitato-C.png' },
        { nome: 'D', caminho: '/xray/capitato/capitato-D.png' },
        { nome: 'E', caminho: '/xray/capitato/capitato-E.png' },
        { nome: 'F', caminho: '/xray/capitato/capitato-F.png' },
        { nome: 'G', caminho: '/xray/capitato/capitato-G.png' },
        { nome: 'H', caminho: '/xray/capitato/capitato-H.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/capitato/capitato-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/capitato/capitato-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/capitato/capitato-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/capitato/capitato-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/capitato/capitato-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/capitato/capitato-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/capitato/capitato-H-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 11',
      parte: 'hamato',
      descricao: 'Selecione o Hamato correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/hamato/hamato-B.png' },
        { nome: 'C', caminho: '/xray/hamato/hamato-C.png' },
        { nome: 'D', caminho: '/xray/hamato/hamato-D.png' },
        { nome: 'E', caminho: '/xray/hamato/hamato-E.png' },
        { nome: 'F', caminho: '/xray/hamato/hamato-F.png' },
        { nome: 'G', caminho: '/xray/hamato/hamato-G.png' },
        { nome: 'H', caminho: '/xray/hamato/hamato-H.png' },
        { nome: 'I', caminho: '/xray/hamato/hamato-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/hamato/hamato-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/hamato/hamato-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/hamato/hamato-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/hamato/hamato-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/hamato/hamato-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/hamato/hamato-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/hamato/hamato-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/hamato/hamato-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 12',
      parte: 'piramidal',
      descricao: 'Selecione o Piramidal correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/piramidal/piramidal-B.png' },
        { nome: 'C', caminho: '/xray/piramidal/piramidal-C.png' },
        { nome: 'D', caminho: '/xray/piramidal/piramidal-D.png' },
        { nome: 'E', caminho: '/xray/piramidal/piramidal-E.png' },
        { nome: 'F', caminho: '/xray/piramidal/piramidal-F.png' },
        { nome: 'G', caminho: '/xray/piramidal/piramidal-G.png' },
        { nome: 'H', caminho: '/xray/piramidal/piramidal-H.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/piramidal/piramidal-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/piramidal/piramidal-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/piramidal/piramidal-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/piramidal/piramidal-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/piramidal/piramidal-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/piramidal/piramidal-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/piramidal/piramidal-H-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 13',
      parte: 'semilunar',
      descricao: 'Selecione o Semilunar correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/semilunar/semilunar-B.png' },
        { nome: 'C', caminho: '/xray/semilunar/semilunar-C.png' },
        { nome: 'D', caminho: '/xray/semilunar/semilunar-D.png' },
        { nome: 'E', caminho: '/xray/semilunar/semilunar-E.png' },
        { nome: 'F', caminho: '/xray/semilunar/semilunar-F.png' },
        { nome: 'G', caminho: '/xray/semilunar/semilunar-G.png' },
        { nome: 'H', caminho: '/xray/semilunar/semilunar-H.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/semilunar/semilunar-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/semilunar/semilunar-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/semilunar/semilunar-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/semilunar/semilunar-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/semilunar/semilunar-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/semilunar/semilunar-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/semilunar/semilunar-H-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 14',
      parte: 'escafoide',
      descricao: 'Selecione o Escafóide correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/escafoide/escafoide-B.png' },
        { nome: 'C', caminho: '/xray/escafoide/escafoide-C.png' },
        { nome: 'D', caminho: '/xray/escafoide/escafoide-D.png' },
        { nome: 'E', caminho: '/xray/escafoide/escafoide-E.png' },
        { nome: 'F', caminho: '/xray/escafoide/escafoide-F.png' },
        { nome: 'G', caminho: '/xray/escafoide/escafoide-G.png' },
        { nome: 'H', caminho: '/xray/escafoide/escafoide-H.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/escafoide/escafoide-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/escafoide/escafoide-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/escafoide/escafoide-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/escafoide/escafoide-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/escafoide/escafoide-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/escafoide/escafoide-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/escafoide/escafoide-H-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 15',
      parte: 'trapezio',
      descricao: 'Selecione o Trapézio correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/trapezio/trapezio-B.png' },
        { nome: 'C', caminho: '/xray/trapezio/trapezio-C.png' },
        { nome: 'D', caminho: '/xray/trapezio/trapezio-D.png' },
        { nome: 'E', caminho: '/xray/trapezio/trapezio-E.png' },
        { nome: 'F', caminho: '/xray/trapezio/trapezio-F.png' },
        { nome: 'G', caminho: '/xray/trapezio/trapezio-G.png' },
        { nome: 'H', caminho: '/xray/trapezio/trapezio-H.png' },
        { nome: 'I', caminho: '/xray/trapezio/trapezio-I.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/trapezio/trapezio-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/trapezio/trapezio-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/trapezio/trapezio-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/trapezio/trapezio-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/trapezio/trapezio-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/trapezio/trapezio-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/trapezio/trapezio-H-Desenho.png' },
        { nome: 'I', caminho: '/xray/trapezio/trapezio-I-Desenho.png' },
      ],
    },
    {
      name: 'Etapa 16',
      parte: 'trapezoide',
      descricao: 'Selecione o Trapezóide correspondente',
      imagensRaiox: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/trapezoide/trapezoide-B.png' },
        { nome: 'C', caminho: '/xray/trapezoide/trapezoide-C.png' },
        { nome: 'D', caminho: '/xray/trapezoide/trapezoide-D.png' },
        { nome: 'E', caminho: '/xray/trapezoide/trapezoide-E.png' },
        { nome: 'F', caminho: '/xray/trapezoide/trapezoide-F.png' },
        { nome: 'G', caminho: '/xray/trapezoide/trapezoide-G.png' },
        { nome: 'H', caminho: '/xray/trapezoide/trapezoide-H.png' },
      ],
      imagensDesenho: [
        { nome: 'A', caminho: '/None.svg' },
        { nome: 'B', caminho: '/xray/trapezoide/trapezoide-B-Desenho.png' },
        { nome: 'C', caminho: '/xray/trapezoide/trapezoide-C-Desenho.png' },
        { nome: 'D', caminho: '/xray/trapezoide/trapezoide-D-Desenho.png' },
        { nome: 'E', caminho: '/xray/trapezoide/trapezoide-E-Desenho.png' },
        { nome: 'F', caminho: '/xray/trapezoide/trapezoide-F-Desenho.png' },
        { nome: 'G', caminho: '/xray/trapezoide/trapezoide-G-Desenho.png' },
        { nome: 'H', caminho: '/xray/trapezoide/trapezoide-H-Desenho.png' },
      ],
    },
  ]

  const handleViewTypeChange = (type) => {
    setViewType(type)
  }

  const handleNextStep = () => {
    if (selecionados[currentStep] !== undefined) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast({
        description: 'Por favor, selecione uma imagem antes de prosseguir.',
      })
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    let totalTW2 = 0
    let totalRUS = 0

    for (let i = 0; i < Object.keys(selecionados).length; i++) {
      const x = values[partes[`${i}`]][letras[selecionados[`${i}`]]][patient.sexoBiologico]
      totalTW2 += x['TW2']
      totalRUS += x['RUS']
    }

    let y = {
      'TW2': totalTW2,
      'RUS': totalRUS,
    }

    setAges(y)
    setIsLoading(false)
    setCurrentStep(currentStep + 1)
  }

  const handleSelectImage = (stepIndex, imageIndex) => {
    let newSelecteds = (prevSelecionados) => ({
      ...prevSelecionados,
      [stepIndex]: imageIndex,
    })

    setSelecionados(newSelecteds)

    if (stepIndex === steps.length - 1) {
      setIsDisabledConfirmModal(false)
    }
  }

  const ZoomImage = ({ src, alt, width, height }) => {
    const [zoom, setZoom] = useState(false)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const handleMouseEnter = () => {
      setZoom(true)
    }

    const handleMouseMove = (e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      setOffset({ x, y })
    }

    const handleMouseLeave = () => {
      setZoom(false)
      setOffset({ x: 0, y: 0 })
    }

    return (
      <div
        className='relative overflow-hidden rounded-lg w-full h-full'
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full transition-transform duration-300 ${zoom ? 'scale-150' : 'scale-100'}`}
          style={{ transformOrigin: `${offset.x}% ${offset.y}%` }}
        />
      </div>
    )
  }


  return (
    <div className='flex-col flex h-full w-full overflow-y-auto overflow-x-hidden'>
      <div className='w-full h-full flex flex-col gap-4'>
        {currentStep !== steps.length && (
          <>
            <H2 className='break-words'>{steps[currentStep].name}</H2>
            <H4 className='break-words'>{steps[currentStep].descricao}</H4>
            <div className='flex-col flex sm:flex-row w-full gap-8'>
              <div className='w-full sm:w-2/3'>
                <Tabs defaultValue={viewType} onValueChange={handleViewTypeChange}>
                  <div className='flex w-full justify-center'>
                    <div className='flex w-full justify-between'>
                      {currentStep !== 0 && (
                        <Button onClick={handlePreviousStep} disabled={isLoading}>
                          Anterior
                        </Button>
                      )}
                    </div>

                    <TabsList>
                      <TabsTrigger value='raiox'>Raio-X</TabsTrigger>
                      <TabsTrigger value='desenho'>Desenho</TabsTrigger>
                    </TabsList>

                    <div className='flex w-full justify-end'>
                      {currentStep === steps.length - 1 ? (
                        <Dialog open={showConfirmModal} onOpenChange={() => { setShowConfirmModal(!showConfirmModal) }}>
                          <DialogTrigger>
                            <Button disabled={isDisabledConfirmModal}>Finalizar</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Deseja finalizar o teste?</DialogTitle>
                            </DialogHeader>
                            <div className='flex w-full justify-between'>
                              <Button onClick={() => { setShowConfirmModal(!showConfirmModal) }} variant='secondary'>Cancelar</Button>
                              <Button onClick={() => { handleSubmit() }}>Confirmar</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button onClick={handleNextStep} disabled={selecionados[currentStep] === undefined || isLoading}>
                          Próximo
                        </Button>
                      )}
                    </div>
                  </div>
                  <TabsContent value='raiox'>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-full'>
                      {steps[currentStep].imagensRaiox.map((image, index) => (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center justify-between h-full rounded-lg border-4 ${selecionados[currentStep] === index ? 'border-blue-500' : 'border-neutral-200'}`}
                          onClick={() => handleSelectImage(currentStep, index)}
                        >
                          <Image
                            src={image.caminho}
                            alt={image.nome}
                            width={100}
                            height={100}
                            className='w-full h-full rounded-t-lg'
                          />
                          <button className={`w-full p-2 font-medium ${selecionados[currentStep] === index ? 'bg-blue-500 text-white' : 'bg-neutral-200'}`}>
                            {selecionados[currentStep] === index ? 'Selecionado' : `Selecionar ${image.nome}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value='desenho'>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                      {steps[currentStep].imagensDesenho.map((image, index) => (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center justify-between h-full rounded-lg border-4 ${selecionados[currentStep] === index ? 'border-blue-500' : 'border-neutral-200'}`}
                          onClick={() => handleSelectImage(currentStep, index)}
                        >
                          <ZoomImage
                            src={image.caminho}
                            alt={image.nome}
                            width={100}
                            height={100}
                          />
                          <button className={`w-full p-2 font-medium ${selecionados[currentStep] === index ? 'bg-blue-500 text-white' : 'bg-neutral-200'}`}>
                            {selecionados[currentStep] === index ? 'Selecionado' : `Selecionar ${image.nome}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className='w-full sm:w-1/3 h-full flex'>
                <ZoomImage
                  src={decodeURIComponent(analysis)}
                  alt={'Imagem Para Comparação'}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </>
        )}
        {currentStep === steps.length && (
          <>
            <H2 className='break-words'>Resultado</H2>
            <div className='flex flex-col gap-8 w-full h-full justify-center items-center'>
              <H4>O resultado da análise</H4>
              <div className='flex items-center gap-12'>
                {tipos.map((item, index) => (
                  <div key={index} className='flex flex-col justify-center items-center'>
                    <Small>{item}</Small>
                    <h3 className='italic text-6xl'>{ages[tipos[index]]}</h3>
                  </div>
                ))}
              </div>
              <Button onClick={() => { toogleIaModal() }}>Retornar</Button>
            </div>
          </>
        )}
      </div>
    </div>

  )

}
