import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // Se o type não possuir 'income' ou 'outcome'
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Nao é uma transacao valida');
    }
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new Error('Voce nao tem saldo suficiente');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
